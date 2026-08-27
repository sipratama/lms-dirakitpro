import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { orderStatusEnum, paymentStatusEnum, refundStatusEnum } from "./enums";
import { users } from "./identity";
import { courses } from "./catalog";

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "restrict" }),
    // Snapshot immutable (COM-002) — tidak pernah di-update setelah insert. Tabel ini sengaja
    // TIDAK punya kolom updated_at / trigger set_updated_at — lihat docs/DATA-MODEL.md §1.4.
    courseTitleSnapshot: text("course_title_snapshot").notNull(),
    priceAmountSnapshot: integer("price_amount_snapshot").notNull(),
    currencySnapshot: text("currency_snapshot").notNull(),
    totalAmount: integer("total_amount").notNull(),
    status: orderStatusEnum("status").notNull().default("PENDING"), // §10.1
    // Transisi PENDING → EXPIRED otoritatif lewat webhook Midtrans; expiresAt murni untuk UI/backstop sweep.
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // COM-006: maksimal satu order PENDING per user+course — partial unique index.
    uniqueIndex("orders_pending_user_course_unique")
      .on(t.userId, t.courseId)
      .where(sql`${t.status} = 'PENDING'`),
    index("orders_status_created_idx").on(t.status, t.createdAt), // admin order view, expiry sweep
    index("orders_user_idx").on(t.userId), // COM-008 order history
  ],
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    provider: text("provider").notNull().default("MIDTRANS"),
    providerOrderId: text("provider_order_id").notNull(), // order_id yang dikirim ke Midtrans
    providerTransactionId: text("provider_transaction_id"), // transaction_id dari Midtrans, terisi setelah ada transaksi
    status: paymentStatusEnum("status").notNull().default("PENDING"),
    rawProviderStatus: text("raw_provider_status"), // status verbatim Midtrans untuk debug
    amount: integer("amount").notNull(),
    paymentType: text("payment_type"), // mis. "credit_card", "gopay"
    signatureVerified: boolean("signature_verified").notNull().default(false), // COM-004/§16 wajib verifikasi signature
    webhookPayload: jsonb("webhook_payload"), // payload webhook terakhir, untuk audit/debug
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // COM-005: kunci idempotensi webhook — retry dengan providerOrderId sama tidak membuat baris baru.
    uniqueIndex("payments_provider_order_unique").on(t.providerOrderId),
    index("payments_order_idx").on(t.orderId),
  ],
);

export const refunds = pgTable(
  "refunds",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "restrict" }),
    paymentId: uuid("payment_id")
      .notNull()
      .references(() => payments.id, { onDelete: "restrict" }),
    amount: integer("amount").notNull(), // rupiah — bisa parsial atau penuh, mengikuti kebijakan refund Midtrans
    reason: text("reason"), // alasan refund, diisi admin saat memicu manual
    status: refundStatusEnum("status").notNull().default("PENDING"),
    providerRefundId: text("provider_refund_id"), // refund_key dari response refund API Midtrans
    rawProviderResponse: jsonb("raw_provider_response"), // payload response/webhook refund Midtrans, untuk audit/debug
    processedByUserId: uuid("processed_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }), // admin pemicu; null kalau otomatis dari webhook
    requestedAt: timestamp("requested_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }), // terisi saat Midtrans konfirmasi SUCCESS/FAILED
  },
  (t) => [
    index("refunds_order_idx").on(t.orderId),
    index("refunds_status_idx").on(t.status), // admin refund queue
  ],
);
