import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { enrollments, orders, payments } from "@/db/schema";
import { mapMidtransStatus, verifyMidtransSignature } from "@/lib/midtrans";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    order_id: orderId,
    status_code: statusCode,
    gross_amount: grossAmount,
    signature_key: signatureKey,
    transaction_status: transactionStatus,
    fraud_status: fraudStatus,
    transaction_id: transactionId,
    payment_type: paymentType,
  } = body;

  const signatureValid = verifyMidtransSignature({
    orderId,
    statusCode,
    grossAmount,
    signatureKey,
  });

  if (!signatureValid) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const [payment] = await db
    .select({
      id: payments.id,
      orderId: payments.orderId,
      paidAt: payments.paidAt,
    })
    .from(payments)
    .where(eq(payments.providerOrderId, orderId))
    .limit(1);

  if (!payment) {
    console.error(`Midtrans webhook: no payment found for order_id=${orderId}`);
    return Response.json({ received: true }, { status: 200 });
  }

  const mappedStatus = mapMidtransStatus({
    transactionStatus,
    fraudStatus,
  });

  await db.transaction(async (tx) => {
    await tx
      .update(payments)
      .set({
        status: mappedStatus,
        rawProviderStatus: transactionStatus,
        providerTransactionId: transactionId,
        paymentType,
        signatureVerified: true,
        webhookPayload: body,
        paidAt: mappedStatus === "SUCCESS" ? new Date() : payment.paidAt,
        updatedAt: new Date(),
      })
      .where(eq(payments.id, payment.id));

    if (mappedStatus === "SUCCESS") {
      await tx
        .update(orders)
        .set({ status: "PAID" })
        .where(
          and(eq(orders.id, payment.orderId), eq(orders.status, "PENDING")),
        );

      const [order] = await tx
        .select({ userId: orders.userId, courseId: orders.courseId })
        .from(orders)
        .where(eq(orders.id, payment.orderId))
        .limit(1);

      if (order) {
        await tx
          .insert(enrollments)
          .values({
            userId: order.userId,
            courseId: order.courseId,
            source: "PAID",
          })
          .onConflictDoNothing({
            target: [enrollments.userId, enrollments.courseId],
          });
      }
    } else if (mappedStatus === "EXPIRED") {
      await tx
        .update(orders)
        .set({ status: "EXPIRED" })
        .where(
          and(eq(orders.id, payment.orderId), eq(orders.status, "PENDING")),
        );
    } else if (mappedStatus === "FAILED" || mappedStatus === "CANCELLED") {
      await tx
        .update(orders)
        .set({ status: "CANCELLED" })
        .where(
          and(eq(orders.id, payment.orderId), eq(orders.status, "PENDING")),
        );
    }
    // PENDING / REFUNDED: tidak ada perubahan orders di sini — lihat spek langkah 10.
  });

  return Response.json({ received: true });
}
