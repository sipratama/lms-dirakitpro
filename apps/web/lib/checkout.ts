import { and, eq, isNull, or } from "drizzle-orm";
import { db } from "@/db/client";
import { courses, enrollments, orders, payments, users } from "@/db/schema";
import { createSnapTransaction } from "@/lib/midtrans";

const ORDER_TTL_MS = 24 * 60 * 60 * 1000;

type CreateCheckoutOrderResult =
  | { ok: false; reason: "NOT_FOUND" }
  | { ok: false; reason: "NOT_PURCHASABLE" }
  | { ok: false; reason: "ALREADY_OWNED" }
  | { ok: true; orderId: string; existingPending: true }
  | { ok: true; orderId: string; snapToken: string };

export async function createCheckoutOrder(
  userId: string,
  courseSlug: string,
): Promise<CreateCheckoutOrderResult> {
  const [course] = await db
    .select({
      id: courses.id,
      title: courses.title,
      isFree: courses.isFree,
      priceAmount: courses.priceAmount,
      currency: courses.currency,
    })
    .from(courses)
    .where(
      and(
        eq(courses.slug, courseSlug),
        eq(courses.status, "PUBLISHED"),
        isNull(courses.deletedAt),
      ),
    )
    .limit(1);

  if (!course) return { ok: false, reason: "NOT_FOUND" };
  if (course.isFree) return { ok: false, reason: "NOT_PURCHASABLE" };

  const [existingEnrollment] = await db
    .select({ id: enrollments.id })
    .from(enrollments)
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, course.id),
        or(
          eq(enrollments.status, "ACTIVE"),
          eq(enrollments.status, "COMPLETED"),
        ),
      ),
    )
    .limit(1);

  if (existingEnrollment) return { ok: false, reason: "ALREADY_OWNED" };

  const [existingPendingOrder] = await db
    .select({ id: orders.id, expiresAt: orders.expiresAt })
    .from(orders)
    .where(
      and(
        eq(orders.userId, userId),
        eq(orders.courseId, course.id),
        eq(orders.status, "PENDING"),
      ),
    )
    .limit(1);

  if (existingPendingOrder) {
    const isExpired =
      existingPendingOrder.expiresAt !== null &&
      existingPendingOrder.expiresAt < new Date();

    if (!isExpired) {
      return {
        ok: true,
        orderId: existingPendingOrder.id,
        existingPending: true,
      };
    }

    // Lazy backstop sweep (docs/DATA-MODEL.md §3.7 komentar orders.expiresAt) — buka slot
    // di partial unique index orders_pending_user_course_unique sebelum insert order baru.
    await db
      .update(orders)
      .set({ status: "EXPIRED" })
      .where(
        and(
          eq(orders.id, existingPendingOrder.id),
          eq(orders.status, "PENDING"),
        ),
      );
  }

  const [newOrder] = await db
    .insert(orders)
    .values({
      userId,
      courseId: course.id,
      courseTitleSnapshot: course.title,
      priceAmountSnapshot: course.priceAmount,
      currencySnapshot: course.currency,
      totalAmount: course.priceAmount,
      status: "PENDING",
      expiresAt: new Date(Date.now() + ORDER_TTL_MS),
    })
    .returning({ id: orders.id, totalAmount: orders.totalAmount });

  const [user] = await db
    .select({ displayName: users.displayName, email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const { token } = await createSnapTransaction({
    orderId: newOrder.id,
    grossAmount: newOrder.totalAmount,
    customerDetails: {
      firstName: user?.displayName ?? "",
      email: user?.email ?? "",
    },
  });

  await db.insert(payments).values({
    orderId: newOrder.id,
    provider: "MIDTRANS",
    providerOrderId: newOrder.id,
    status: "PENDING",
    amount: newOrder.totalAmount,
  });

  return { ok: true, orderId: newOrder.id, snapToken: token };
}
