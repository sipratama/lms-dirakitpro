import { randomUUID } from "node:crypto";
import { expect, test } from "../support/fixtures";
import { buildMidtransNotification } from "../support/midtrans";
import {
  findEnrollment,
  findOrder,
  findPayment,
  seedPendingOrder,
} from "../support/seed";

const WEBHOOK_PATH = "/api/webhooks/midtrans";

/**
 * Bagian "Purchase" dari alur inti, diuji tanpa kredensial Midtrans sandbox sama
 * sekali dan tanpa membuka overlay Snap di browser.
 *
 * Yang diuji di sini adalah sisi yang otoritatif: webhook-lah yang menentukan
 * order PAID/EXPIRED/CANCELLED dan yang membuat enrollment (lihat
 * app/api/webhooks/midtrans/route.ts). Overlay Snap hanya pemicu UI.
 */
test.describe("Webhook Midtrans menentukan status order", () => {
  test("settlement mengubah order jadi PAID dan membuat enrollment", async ({
    request,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId, totalAmount } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    const response = await request.post(WEBHOOK_PATH, {
      data: buildMidtransNotification({
        orderId,
        grossAmount: totalAmount,
        transactionStatus: "settlement",
      }),
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ received: true });

    expect(await findOrder(orderId)).toMatchObject({ status: "PAID" });

    const payment = await findPayment(orderId);
    expect(payment).toMatchObject({
      status: "SUCCESS",
      signatureVerified: true,
      rawProviderStatus: "settlement",
    });
    expect(payment?.paidAt).not.toBeNull();

    // COM-005: entitlement lahir dari webhook, bukan dari halaman checkout.
    expect(await findEnrollment(dbOnlyLearnerUserId, course.id)).toMatchObject({
      status: "ACTIVE",
      source: "PAID",
    });
  });

  test("capture + fraud_status accept juga menghasilkan PAID", async ({
    request,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId, totalAmount } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    const response = await request.post(WEBHOOK_PATH, {
      data: buildMidtransNotification({
        orderId,
        grossAmount: totalAmount,
        transactionStatus: "capture",
        fraudStatus: "accept",
        paymentType: "credit_card",
      }),
    });

    expect(response.status()).toBe(200);
    expect(await findOrder(orderId)).toMatchObject({ status: "PAID" });
  });

  test("capture + fraud_status challenge tetap PENDING", async ({
    request,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId, totalAmount } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    await request.post(WEBHOOK_PATH, {
      data: buildMidtransNotification({
        orderId,
        grossAmount: totalAmount,
        transactionStatus: "capture",
        fraudStatus: "challenge",
        paymentType: "credit_card",
      }),
    });

    expect(await findOrder(orderId)).toMatchObject({ status: "PENDING" });
    expect(await findEnrollment(dbOnlyLearnerUserId, course.id)).toBeNull();
  });

  test("expire mengubah order jadi EXPIRED tanpa enrollment", async ({
    request,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId, totalAmount } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    await request.post(WEBHOOK_PATH, {
      data: buildMidtransNotification({
        orderId,
        grossAmount: totalAmount,
        transactionStatus: "expire",
      }),
    });

    expect(await findOrder(orderId)).toMatchObject({ status: "EXPIRED" });
    expect(await findEnrollment(dbOnlyLearnerUserId, course.id)).toBeNull();
  });

  test("signature salah ditolak 400 dan tidak mengubah apa pun", async ({
    request,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId, totalAmount } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    const response = await request.post(WEBHOOK_PATH, {
      data: buildMidtransNotification({
        orderId,
        grossAmount: totalAmount,
        transactionStatus: "settlement",
        tamperSignature: true,
      }),
    });

    expect(response.status()).toBe(400);
    expect(await findOrder(orderId)).toMatchObject({ status: "PENDING" });
    expect(await findPayment(orderId)).toMatchObject({
      status: "PENDING",
      signatureVerified: false,
    });
    expect(await findEnrollment(dbOnlyLearnerUserId, course.id)).toBeNull();
  });

  test("retry dengan payload sama bersifat idempoten (COM-005)", async ({
    request,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId, totalAmount } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    const notification = buildMidtransNotification({
      orderId,
      grossAmount: totalAmount,
      transactionStatus: "settlement",
    });

    const first = await request.post(WEBHOOK_PATH, { data: notification });
    const second = await request.post(WEBHOOK_PATH, { data: notification });

    expect(first.status()).toBe(200);
    expect(second.status()).toBe(200);
    expect(await findOrder(orderId)).toMatchObject({ status: "PAID" });
    expect(await findEnrollment(dbOnlyLearnerUserId, course.id)).toMatchObject({
      status: "ACTIVE",
    });
  });

  test("order_id tak dikenal dijawab 200 supaya Midtrans berhenti retry", async ({
    request,
  }) => {
    const response = await request.post(WEBHOOK_PATH, {
      data: buildMidtransNotification({
        orderId: randomUUID(),
        grossAmount: 10_000,
        transactionStatus: "settlement",
      }),
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ received: true });
  });
});
