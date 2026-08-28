import { createHash, timingSafeEqual } from "node:crypto";

const SNAP_TRANSACTION_URL =
  process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/v1/transactions"
    : "https://app.sandbox.midtrans.com/snap/v1/transactions";

type CreateSnapTransactionParams = {
  orderId: string;
  grossAmount: number;
  customerDetails: { firstName: string; email: string };
};

export async function createSnapTransaction({
  orderId,
  grossAmount,
  customerDetails,
}: CreateSnapTransactionParams): Promise<{
  token: string;
  redirectUrl: string;
}> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const authHeader = `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`;

  const response = await fetch(SNAP_TRANSACTION_URL, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transaction_details: { order_id: orderId, gross_amount: grossAmount },
      customer_details: {
        first_name: customerDetails.firstName,
        email: customerDetails.email,
      },
      callbacks: { finish: `${process.env.APP_URL}/payment/${orderId}` },
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.error_messages)
      ? body.error_messages.join(", ")
      : `Midtrans Snap transaction gagal (status ${response.status})`;
    throw new Error(message);
  }

  const body = await response.json();
  return { token: body.token, redirectUrl: body.redirect_url };
}

type VerifyMidtransSignatureParams = {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
};

export function verifyMidtransSignature({
  orderId,
  statusCode,
  grossAmount,
  signatureKey,
}: VerifyMidtransSignatureParams): boolean {
  for (const field of [orderId, statusCode, grossAmount, signatureKey]) {
    if (typeof field !== "string" || field.length === 0) return false;
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const expected = createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const actualBuffer = Buffer.from(signatureKey, "utf8");
  if (expectedBuffer.length !== actualBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

type MappedPaymentStatus =
  "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED" | "CANCELLED" | "REFUNDED";

export function mapMidtransStatus({
  transactionStatus,
  fraudStatus,
}: {
  transactionStatus: string;
  fraudStatus?: string;
}): MappedPaymentStatus {
  if (transactionStatus === "capture") {
    if (fraudStatus === "accept") return "SUCCESS";
    if (fraudStatus === "challenge") return "PENDING";
    if (fraudStatus === "deny") return "FAILED";
    return "PENDING";
  }
  if (transactionStatus === "settlement") return "SUCCESS";
  if (transactionStatus === "pending") return "PENDING";
  if (transactionStatus === "deny") return "FAILED";
  if (transactionStatus === "cancel") return "CANCELLED";
  if (transactionStatus === "expire") return "EXPIRED";
  if (transactionStatus === "refund" || transactionStatus === "partial_refund")
    return "REFUNDED";
  return "PENDING";
}
