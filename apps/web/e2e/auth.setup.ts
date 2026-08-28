import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";
import { closeDb } from "./support/db";
import { linkClerkIdentity, upsertUser } from "./support/seed";
import { AUTH_CONTEXT_FILE, type AuthContext } from "./support/fixtures";
import {
  CLERK_USER_EMAIL,
  CLERK_USER_PASSWORD,
  HAS_CLERK_AUTH,
  STORAGE_STATE,
} from "./support/env";

/**
 * Login sekali per run, lalu pakai ulang storageState-nya di semua spec
 * terautentikasi. Alasan pilih pendekatan ini (bukan bypass auth di kode
 * produksi) ada di e2e/README.md.
 */
setup("authenticate learner", async ({ page }) => {
  mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });

  if (!HAS_CLERK_AUTH) {
    // Tulis storageState kosong supaya project yang depend on setup ini tetap bisa
    // start; spec-nya sendiri sudah menjaga diri lewat test.skip(!HAS_CLERK_AUTH).
    writeFileSync(STORAGE_STATE, JSON.stringify({ cookies: [], origins: [] }));
    setup.skip(true, "Kredensial Clerk E2E tidak tersedia — dilewati.");
    return;
  }

  // Mengambil Testing Token dari Clerk Backend API (butuh CLERK_SECRET_KEY dari
  // *development instance*). Tanpa ini, bot detection Clerk memblokir login otomatis.
  await clerkSetup();

  // ClerkProvider dipasang di app/layout.tsx (root), jadi window.Clerk sudah termuat
  // di halaman mana pun. Kita pakai "/" karena publik — tidak memicu redirect
  // auth.protect() sebelum sesi terbentuk.
  await page.goto("/");

  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: CLERK_USER_EMAIL,
      password: CLERK_USER_PASSWORD,
    },
  });

  const clerkUserId = await page.evaluate(
    () =>
      (window as unknown as { Clerk?: { user?: { id?: string } } }).Clerk?.user
        ?.id ?? null,
  );

  if (!clerkUserId) {
    throw new Error(
      "Login Clerk selesai tapi window.Clerk.user.id kosong — cek konfigurasi instance.",
    );
  }

  // Menggantikan webhook /api/webhooks/clerk yang tidak berjalan di localhost.
  const internalUserId = await upsertUser({
    email: CLERK_USER_EMAIL,
    displayName: "E2E Learner",
  });
  await linkClerkIdentity(internalUserId, clerkUserId);

  const context: AuthContext = {
    clerkUserId,
    internalUserId,
    email: CLERK_USER_EMAIL,
  };
  writeFileSync(AUTH_CONTEXT_FILE, JSON.stringify(context, null, 2));
  await page.context().storageState({ path: STORAGE_STATE });
  await closeDb();
});
