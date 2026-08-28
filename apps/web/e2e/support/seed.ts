import { randomUUID } from "node:crypto";
import { and, eq, like } from "drizzle-orm";
import {
  authIdentities,
  courses,
  enrollments,
  orders,
  payments,
  users,
} from "@/db/schema";
import { db } from "./db";

// ---------------------------------------------------------------------------
// Konvensi namespace fixture
//
// SEMUA baris yang dibuat E2E memakai prefix di bawah. Cleanup selalu dibatasi
// ke prefix ini, jadi seed/cleanup tidak akan pernah menyentuh data dev asli
// (tidak ada TRUNCATE / reset tabel di mana pun di direktori ini).
// ---------------------------------------------------------------------------
export const E2E_COURSE_SLUG_PREFIX = "e2e-course-";
export const E2E_EMAIL_DOMAIN = "@e2e.dirakitpro.test";

export const ADMIN_EMAIL = `e2e-admin${E2E_EMAIL_DOMAIN}`;
/** Learner "orang lain" — dipakai untuk menguji guard kepemilikan order. */
export const OTHER_LEARNER_EMAIL = `e2e-other-learner${E2E_EMAIL_DOMAIN}`;

export function uniqueCourseSlug() {
  return `${E2E_COURSE_SLUG_PREFIX}${randomUUID().slice(0, 8)}`;
}

/** Upsert user internal berdasarkan email (unique index `users_email_unique`). */
export async function upsertUser({
  email,
  displayName,
  role = "LEARNER",
}: {
  email: string;
  displayName: string;
  role?: "LEARNER" | "ADMIN";
}): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email, displayName, role })
    .onConflictDoUpdate({
      target: users.email,
      set: { displayName, role, deletedAt: null, updatedAt: new Date() },
    })
    .returning({ id: users.id });
  return row.id;
}

/**
 * Menautkan user internal ke Clerk user id.
 *
 * Di produksi baris ini dibuat webhook `/api/webhooks/clerk`. Di E2E tidak ada
 * webhook yang di-forward ke localhost, jadi seed yang mengisinya — kalau tidak,
 * getInternalUserIdByClerkId() mengembalikan null dan halaman checkout/payment
 * hanya menampilkan "Akun sedang disinkronkan".
 */
export async function linkClerkIdentity(userId: string, clerkUserId: string) {
  await db
    .insert(authIdentities)
    .values({ userId, provider: "CLERK", providerUserId: clerkUserId })
    .onConflictDoUpdate({
      target: [authIdentities.provider, authIdentities.providerUserId],
      set: { userId },
    });
}

export async function seedAdminUser() {
  return upsertUser({
    email: ADMIN_EMAIL,
    displayName: "E2E Admin",
    role: "ADMIN",
  });
}

/**
 * Satu course PUBLISHED berbayar per test.
 *
 * Course per-test adalah batas isolasi yang dipakai suite ini: semua unique index
 * yang relevan di-scope oleh courseId (`orders_pending_user_course_unique`,
 * `enrollments_user_course_unique`), jadi test paralel yang berbagi user learner
 * yang sama tetap tidak saling tabrakan selama course-nya berbeda.
 */
export async function seedPaidCourse({
  slug,
  createdByUserId,
  priceAmount = 249_000,
  title = "Kelas E2E Berbayar",
}: {
  slug: string;
  createdByUserId: string;
  priceAmount?: number;
  title?: string;
}): Promise<{ id: string; slug: string; priceAmount: number }> {
  const [row] = await db
    .insert(courses)
    .values({
      slug,
      title,
      shortOutcome: "Hasil akhir untuk keperluan E2E.",
      description: "Course fixture yang dibuat oleh Playwright E2E.",
      finalProjectConfig: {
        requireLiveUrl: false,
        requireRepoUrl: true,
        requireScreenshot: false,
        allowTechList: true,
      },
      level: "BEGINNER",
      isFree: false,
      priceAmount,
      currency: "IDR",
      status: "PUBLISHED",
      publishedAt: new Date(),
      createdByUserId,
    })
    .onConflictDoUpdate({
      target: courses.slug,
      set: { status: "PUBLISHED", deletedAt: null, updatedAt: new Date() },
    })
    .returning({
      id: courses.id,
      slug: courses.slug,
      priceAmount: courses.priceAmount,
    });
  return row;
}

/**
 * Order PENDING + baris payment pasangannya, persis seperti bentuk yang dibuat
 * createCheckoutOrder() (lib/checkout.ts): payments.providerOrderId == orders.id.
 * Itu kunci yang dipakai handler webhook untuk menemukan payment-nya.
 */
export async function seedPendingOrder({
  userId,
  courseId,
  totalAmount,
  courseTitle = "Kelas E2E Berbayar",
}: {
  userId: string;
  courseId: string;
  totalAmount: number;
  courseTitle?: string;
}): Promise<{ orderId: string; totalAmount: number }> {
  const [order] = await db
    .insert(orders)
    .values({
      userId,
      courseId,
      courseTitleSnapshot: courseTitle,
      priceAmountSnapshot: totalAmount,
      currencySnapshot: "IDR",
      totalAmount,
      status: "PENDING",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .returning({ id: orders.id, totalAmount: orders.totalAmount });

  await db.insert(payments).values({
    orderId: order.id,
    provider: "MIDTRANS",
    providerOrderId: order.id,
    status: "PENDING",
    amount: order.totalAmount,
  });

  return { orderId: order.id, totalAmount: order.totalAmount };
}

export async function seedEnrollment({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) {
  await db
    .insert(enrollments)
    .values({ userId, courseId, source: "PAID", status: "ACTIVE" })
    .onConflictDoNothing({
      target: [enrollments.userId, enrollments.courseId],
    });
}

export async function findOrder(orderId: string) {
  const [row] = await db
    .select({ id: orders.id, status: orders.status })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);
  return row ?? null;
}

export async function findPayment(providerOrderId: string) {
  const [row] = await db
    .select({
      status: payments.status,
      signatureVerified: payments.signatureVerified,
      rawProviderStatus: payments.rawProviderStatus,
      paidAt: payments.paidAt,
    })
    .from(payments)
    .where(eq(payments.providerOrderId, providerOrderId))
    .limit(1);
  return row ?? null;
}

export async function findEnrollment(userId: string, courseId: string) {
  const [row] = await db
    .select({
      id: enrollments.id,
      status: enrollments.status,
      source: enrollments.source,
    })
    .from(enrollments)
    .where(
      and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)),
    )
    .limit(1);
  return row ?? null;
}

/**
 * Buang satu course fixture beserta turunannya.
 *
 * Urutan penting: `orders.courseId` memakai onDelete RESTRICT (docs/DATA-MODEL.md —
 * order tidak boleh hilang gara-gara course dihapus), jadi order harus dihapus
 * lebih dulu secara eksplisit. payments ikut lewat cascade dari orders, dan
 * enrollments ikut lewat cascade dari courses.
 */
export async function deleteCourseFixture(courseId: string) {
  await db.delete(orders).where(eq(orders.courseId, courseId));
  await db.delete(courses).where(eq(courses.id, courseId));
}

/** Sapu bersih sisa fixture dari run yang gagal/terputus. Selalu dibatasi prefix E2E. */
export async function sweepOrphanFixtures() {
  const stale = await db
    .select({ id: courses.id })
    .from(courses)
    .where(like(courses.slug, `${E2E_COURSE_SLUG_PREFIX}%`));

  for (const course of stale) {
    await deleteCourseFixture(course.id);
  }
}
