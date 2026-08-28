import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/client";
import { courses, orders } from "@/db/schema";
import { getInternalUserIdByClerkId } from "@/lib/auth";
import { PaymentStatusPoller } from "@/components/payment-status-poller";

const STATUS_TEXT: Record<string, string> = {
  PENDING: "Menunggu pembayaran",
  EXPIRED: "Order kedaluwarsa",
  CANCELLED: "Order dibatalkan",
  REFUNDED: "Order sudah di-refund",
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function PaymentStatusPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const { userId: clerkUserId } = await auth.protect();
  const userId = await getInternalUserIdByClerkId(clerkUserId);

  if (!userId) {
    return <p>Akun sedang disinkronkan, coba lagi dalam beberapa detik.</p>;
  }

  if (!UUID_RE.test(orderId)) notFound();

  const [order] = await db
    .select({
      id: orders.id,
      userId: orders.userId,
      courseId: orders.courseId,
      status: orders.status,
    })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!order || order.userId !== userId) notFound();

  if (order.status === "PAID") {
    const [course] = await db
      .select({ slug: courses.slug })
      .from(courses)
      .where(eq(courses.id, order.courseId))
      .limit(1);

    return (
      <div>
        <h1>Pembayaran berhasil, kelas sudah aktif</h1>
        {course && <Link href={`/learn/${course.slug}`}>Mulai belajar</Link>}
      </div>
    );
  }

  return (
    <div>
      <h1>{STATUS_TEXT[order.status] ?? order.status}</h1>
      {order.status === "PENDING" && <PaymentStatusPoller />}
    </div>
  );
}
