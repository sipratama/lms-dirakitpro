import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mapMidtransStatus, verifyMidtransSignature } from "./midtrans";

describe("mapMidtransStatus", () => {
  it('maps "capture" + fraud_status "accept" to SUCCESS', () => {
    expect(
      mapMidtransStatus({
        transactionStatus: "capture",
        fraudStatus: "accept",
      }),
    ).toBe("SUCCESS");
  });

  it('maps "capture" + fraud_status "challenge" to PENDING', () => {
    expect(
      mapMidtransStatus({
        transactionStatus: "capture",
        fraudStatus: "challenge",
      }),
    ).toBe("PENDING");
  });

  it('maps "capture" + fraud_status "deny" to FAILED', () => {
    expect(
      mapMidtransStatus({ transactionStatus: "capture", fraudStatus: "deny" }),
    ).toBe("FAILED");
  });

  it('maps "capture" with an unknown/missing fraud_status to PENDING', () => {
    expect(mapMidtransStatus({ transactionStatus: "capture" })).toBe("PENDING");
  });

  it('maps "settlement" to SUCCESS', () => {
    expect(mapMidtransStatus({ transactionStatus: "settlement" })).toBe(
      "SUCCESS",
    );
  });

  it('maps "pending" to PENDING', () => {
    expect(mapMidtransStatus({ transactionStatus: "pending" })).toBe("PENDING");
  });

  it('maps "deny" to FAILED', () => {
    expect(mapMidtransStatus({ transactionStatus: "deny" })).toBe("FAILED");
  });

  it('maps "cancel" to CANCELLED', () => {
    expect(mapMidtransStatus({ transactionStatus: "cancel" })).toBe(
      "CANCELLED",
    );
  });

  it('maps "expire" to EXPIRED', () => {
    expect(mapMidtransStatus({ transactionStatus: "expire" })).toBe("EXPIRED");
  });

  it('maps "refund" to REFUNDED', () => {
    expect(mapMidtransStatus({ transactionStatus: "refund" })).toBe("REFUNDED");
  });

  it('maps "partial_refund" to REFUNDED', () => {
    expect(mapMidtransStatus({ transactionStatus: "partial_refund" })).toBe(
      "REFUNDED",
    );
  });

  it("falls back to PENDING for an unrecognized transaction_status", () => {
    expect(
      mapMidtransStatus({ transactionStatus: "some_unknown_status" }),
    ).toBe("PENDING");
  });
});

describe("verifyMidtransSignature", () => {
  const originalServerKey = process.env.MIDTRANS_SERVER_KEY;

  beforeEach(() => {
    process.env.MIDTRANS_SERVER_KEY = "test-server-key";
  });

  afterEach(() => {
    process.env.MIDTRANS_SERVER_KEY = originalServerKey;
  });

  const orderId = "ORDER-123";
  const statusCode = "200";
  const grossAmount = "100000.00";

  function computeSignature() {
    return createHash("sha512")
      .update(
        orderId + statusCode + grossAmount + process.env.MIDTRANS_SERVER_KEY,
      )
      .digest("hex");
  }

  it("returns true for a correctly computed signature", () => {
    const signatureKey = computeSignature();
    expect(
      verifyMidtransSignature({
        orderId,
        statusCode,
        grossAmount,
        signatureKey,
      }),
    ).toBe(true);
  });

  it("returns false for a same-length but incorrect signature", () => {
    const validSignature = computeSignature();
    // Flip the first hex character so the length stays identical but the value differs.
    const flippedChar = validSignature[0] === "a" ? "b" : "a";
    const invalidSignature = flippedChar + validSignature.slice(1);

    expect(
      verifyMidtransSignature({
        orderId,
        statusCode,
        grossAmount,
        signatureKey: invalidSignature,
      }),
    ).toBe(false);
  });

  it("returns false for a malformed-length signature without throwing", () => {
    expect(
      verifyMidtransSignature({
        orderId,
        statusCode,
        grossAmount,
        signatureKey: "too-short",
      }),
    ).toBe(false);
  });
});
