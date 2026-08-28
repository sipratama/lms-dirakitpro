import { existsSync } from "node:fs";
import path from "node:path";

// apps/web/next.config.ts memuat .env dari root monorepo lewat process.loadEnvFile.
// Proses Playwright (config, global setup, spec) TIDAK lewat next.config.ts, jadi
// kita harus memuat file yang sama sendiri supaya DATABASE_URL/CLERK_* tersedia.
//
// Catatan penting (sudah diverifikasi): process.loadEnvFile TIDAK menimpa variabel
// yang sudah ada di process.env. Itulah yang membuat E2E_MIDTRANS_SERVER_KEY di
// bawah bisa di-inject ke dev server lewat webServer.env walaupun .env root punya
// MIDTRANS_SERVER_KEY kosong.
const ROOT_ENV = path.resolve(__dirname, "../../../../.env");

export function loadRootEnv() {
  if (existsSync(ROOT_ENV)) process.loadEnvFile(ROOT_ENV);
}

loadRootEnv();

function nonEmpty(name: string): boolean {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "";
}

/**
 * Server key yang dipakai E2E untuk menandatangani payload webhook Midtrans.
 *
 * Nilainya SENGAJA dikontrol penuh dari sisi test dan di-inject ke dev server
 * lewat playwright.config.ts -> webServer.env. Dengan begitu kita tidak butuh
 * kredensial Midtrans sandbox asli sama sekali untuk menguji jalur webhook:
 * test menandatangani payload dengan key yang sama persis dengan yang dipakai
 * verifyMidtransSignature() di server.
 */
export const E2E_MIDTRANS_SERVER_KEY =
  process.env.E2E_MIDTRANS_SERVER_KEY ?? "e2e-midtrans-server-key";

export const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

/** Postgres wajib ada untuk SEMUA spec (seed + assert langsung ke DB). */
export const HAS_DATABASE = nonEmpty("DATABASE_URL");

/**
 * Kredensial untuk spec yang butuh sesi login sungguhan.
 *
 * CLERK_SECRET_KEY + publishable key dibutuhkan @clerk/testing untuk mengambil
 * Testing Token (bypass bot detection). E2E_CLERK_USER_EMAIL/PASSWORD adalah user
 * khusus E2E di Clerk *development instance* — lihat e2e/README.md.
 */
export const HAS_CLERK_AUTH =
  nonEmpty("CLERK_SECRET_KEY") &&
  nonEmpty("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") &&
  nonEmpty("E2E_CLERK_USER_EMAIL") &&
  nonEmpty("E2E_CLERK_USER_PASSWORD");

export const CLERK_USER_EMAIL = process.env.E2E_CLERK_USER_EMAIL ?? "";
export const CLERK_USER_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD ?? "";

export const SKIP_AUTH_REASON =
  "Butuh sesi Clerk: set E2E_CLERK_USER_EMAIL + E2E_CLERK_USER_PASSWORD di .env " +
  "(user khusus E2E di Clerk development instance). Lihat apps/web/e2e/README.md.";

export const STORAGE_STATE = path.resolve(__dirname, "../.auth/learner.json");
