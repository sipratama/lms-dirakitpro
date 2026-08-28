import { createHash, randomUUID } from "node:crypto";
import { E2E_MIDTRANS_SERVER_KEY } from "./env";

/**
 * Midtrans mengirim gross_amount sebagai string dua desimal ("249000.00"), dan
 * signature dihitung dari string itu APA ADANYA. Jadi jangan pernah menormalkan
 * angkanya di antara pembuatan signature dan pengiriman body.
 */
export function formatGrossAmount(amount: number) {
  return amount.toFixed(2);
}

/**
 * Rumusnya dicocokkan langsung dengan verifyMidtransSignature() di lib/midtrans.ts:
 *   sha512(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
 *
 * Kita tidak butuh kredensial Midtrans sandbox asli: dev server dijalankan dengan
 * MIDTRANS_SERVER_KEY = E2E_MIDTRANS_SERVER_KEY (di-inject lewat webServer.env di
 * playwright.config.ts), dan test menandatangani dengan nilai yang sama.
 */
export function signMidtransPayload({
  orderId,
  statusCode,
  grossAmount,
  serverKey = E2E_MIDTRANS_SERVER_KEY,
}: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  serverKey?: string;
}) {
  return createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex");
}

type NotificationOptions = {
  orderId: string;
  grossAmount: number;
  transactionStatus: string;
  fraudStatus?: string;
  statusCode?: string;
  paymentType?: string;
  /** Sengaja merusak signature — dipakai spec yang menguji penolakan 400. */
  tamperSignature?: boolean;
};

/** Membentuk body notifikasi Midtrans yang bentuknya sama dengan yang dibaca route handler. */
export function buildMidtransNotification({
  orderId,
  grossAmount,
  transactionStatus,
  fraudStatus,
  statusCode = "200",
  paymentType = "bank_transfer",
  tamperSignature = false,
}: NotificationOptions) {
  const gross = formatGrossAmount(grossAmount);
  const signature = signMidtransPayload({
    orderId,
    statusCode,
    grossAmount: gross,
  });

  return {
    order_id: orderId,
    status_code: statusCode,
    gross_amount: gross,
    signature_key: tamperSignature
      ? signature.replace(/^./, signature.startsWith("a") ? "b" : "a")
      : signature,
    transaction_status: transactionStatus,
    fraud_status: fraudStatus,
    transaction_id: randomUUID(),
    payment_type: paymentType,
  };
}
