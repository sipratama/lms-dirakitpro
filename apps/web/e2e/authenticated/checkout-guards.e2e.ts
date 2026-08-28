import { expect, readAuthContext, test } from "../support/fixtures";
import { HAS_CLERK_AUTH, SKIP_AUTH_REASON } from "../support/env";
import { seedEnrollment, seedPendingOrder } from "../support/seed";

/**
 * Guard di createCheckoutOrder() (lib/checkout.ts) yang bisa diuji lewat browser
 * HARI INI, yaitu semua cabang yang return SEBELUM createSnapTransaction()
 * dipanggil. Cabang terakhir (order baru -> Snap token) butuh kredensial Midtrans
 * sandbox asli yang belum diisi — lihat "Yang belum tercakup" di e2e/README.md.
 */
test.describe("Guard halaman checkout", () => {
  test.skip(!HAS_CLERK_AUTH, SKIP_AUTH_REASON);

  test("COM-007: course yang sudah dimiliki tidak bisa dibeli lagi", async ({
    page,
    course,
  }) => {
    const { internalUserId } = readAuthContext();
    await seedEnrollment({ userId: internalUserId, courseId: course.id });

    await page.goto(`/checkout/course/${course.slug}`);

    await expect(
      page.getByText("Kamu sudah memiliki kelas ini."),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Lanjut belajar" }),
    ).toHaveAttribute("href", `/learn/${course.slug}`);
  });

  test("COM-006: order PENDING yang masih hidup dipakai ulang, bukan bikin order baru", async ({
    page,
    course,
  }) => {
    const { internalUserId } = readAuthContext();
    const { orderId } = await seedPendingOrder({
      userId: internalUserId,
      courseId: course.id,
      totalAmount: course.priceAmount,
    });

    await page.goto(`/checkout/course/${course.slug}`);

    // Dialihkan ke order yang sudah ada — bukan membuat order PENDING kedua
    // (partial unique index orders_pending_user_course_unique).
    await expect(page).toHaveURL(new RegExp(`/payment/${orderId}$`));
    await expect(
      page.getByRole("heading", { name: "Menunggu pembayaran" }),
    ).toBeVisible();
  });

  test("slug course yang tidak ada menghasilkan 404", async ({ page }) => {
    const response = await page.goto(
      "/checkout/course/course-yang-tidak-pernah-ada",
    );
    expect(response?.status()).toBe(404);
  });
});
