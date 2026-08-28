import { randomUUID } from "node:crypto";
import { expect, test } from "../support/fixtures";

/**
 * Gerbang auth di project ini SENGAJA tidak dilakukan lewat path-matching di
 * proxy.ts, melainkan resource-based (auth.protect() langsung di page/layout).
 * Spec ini menjaga keputusan itu: kalau suatu saat auth.protect() hilang dari
 * salah satu halaman, test ini merah walaupun proxy.ts tidak berubah.
 */
test.describe("Halaman berbayar tertutup untuk pengunjung anonim", () => {
  test("checkout course mengalihkan pengunjung anonim ke sign-in", async ({
    page,
    course,
  }) => {
    const target = `/checkout/course/${course.slug}`;
    await page.goto(target);

    // Tanpa sesi, auth.protect() melempar ke Clerk (Account Portal untuk
    // development instance). Yang penting: halaman checkout tidak pernah dirender.
    await expect(page).not.toHaveURL(new RegExp(`${target}$`));
    expect(page.url()).toMatch(/clerk|accounts\.|sign-in/i);
  });

  test("halaman status pembayaran mengalihkan pengunjung anonim ke sign-in", async ({
    page,
  }) => {
    const target = `/payment/${randomUUID()}`;
    await page.goto(target);

    await expect(page).not.toHaveURL(new RegExp(`${target}$`));
    expect(page.url()).toMatch(/clerk|accounts\.|sign-in/i);
  });
});
