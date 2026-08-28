import { expect, readAuthContext, test } from "../support/fixtures";
import { HAS_CLERK_AUTH, SKIP_AUTH_REASON } from "../support/env";
import { buildMidtransNotification } from "../support/midtrans";
import { findEnrollment, seedPendingOrder } from "../support/seed";

/**
 * Ini inti coverage langkah 13 untuk "Purchase": membuktikan bahwa halaman status
 * pembayaran benar-benar mengikuti webhook, lewat browser sungguhan.
 *
 * Rangkaiannya: order PENDING -> halaman menampilkan "Menunggu pembayaran" dan
 * memasang PaymentStatusPoller -> webhook settlement masuk -> poller memanggil
 * router.refresh() -> server component merender ulang dan halaman berubah jadi
 * status berhasil. Tidak ada satu pun langkah di atas yang butuh overlay Snap.
 */
test.describe("Status pembayaran mengikuti webhook", () => {
  test.skip(!HAS_CLERK_AUTH, SKIP_AUTH_REASON);

  test("halaman PENDING berubah jadi berhasil setelah webhook settlement", async ({
    page,
    request,
    course,
  }) => {
    const { internalUserId } = readAuthContext();

    const { orderId, totalAmount } = await seedPendingOrder({
      userId: internalUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    await page.goto(`/payment/${orderId}`);
    await expect(
      page.getByRole("heading", { name: "Menunggu pembayaran" }),
    ).toBeVisible();

    const response = await request.post("/api/webhooks/midtrans", {
      data: buildMidtransNotification({
        orderId,
        grossAmount: totalAmount,
        transactionStatus: "settlement",
      }),
    });
    expect(response.status()).toBe(200);

    // PaymentStatusPoller me-refresh tiap 3 detik; beri ruang beberapa siklus.
    await expect(
      page.getByRole("heading", {
        name: "Pembayaran berhasil, kelas sudah aktif",
      }),
    ).toBeVisible({ timeout: 20_000 });

    await expect(
      page.getByRole("link", { name: "Mulai belajar" }),
    ).toHaveAttribute("href", `/learn/${course.slug}`);

    expect(await findEnrollment(internalUserId, course.id)).toMatchObject({
      status: "ACTIVE",
      source: "PAID",
    });
  });

  test("order milik user lain tidak bisa diintip (404)", async ({
    page,
    course,
    dbOnlyLearnerUserId,
  }) => {
    const { orderId } = await seedPendingOrder({
      userId: dbOnlyLearnerUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    const response = await page.goto(`/payment/${orderId}`);
    expect(response?.status()).toBe(404);
  });

  test("orderId non-UUID langsung 404 tanpa menyentuh database", async ({
    page,
  }) => {
    const response = await page.goto("/payment/bukan-uuid");
    expect(response?.status()).toBe(404);
  });
});
