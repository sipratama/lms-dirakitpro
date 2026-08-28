import { defineConfig, devices } from "@playwright/test";
import {
  BASE_URL,
  E2E_MIDTRANS_SERVER_KEY,
  STORAGE_STATE,
} from "./e2e/support/env";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",

  // Sengaja BUKAN "*.spec.ts". Vitest (vitest.config.mts milik langkah unit test)
  // memakai include default `**/*.{test,spec}.*`, jadi file bernama *.spec.ts di
  // sini akan ikut terjaring `vitest run` dan gagal. Pola *.e2e.ts memisahkan
  // kedua runner tanpa perlu mengubah konfigurasi Vitest.
  testMatch: /.*\.(e2e|setup)\.ts$/,

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : [["list"]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts$/,
    },
    {
      // Spec yang TIDAK butuh sesi Clerk sama sekali: webhook Midtrans (HTTP murni)
      // dan guard redirect untuk pengunjung anonim. Ini tetap jalan walaupun
      // kredensial user E2E Clerk belum diisi.
      name: "anonymous",
      testMatch: /anonymous\/.*\.e2e\.ts$/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "authenticated",
      testMatch: /authenticated\/.*\.e2e\.ts$/,
      dependencies: ["setup"],
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
    },
  ],

  webServer: {
    command: "pnpm run dev",
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      // Inti dari strategi simulasi webhook: kita memaksa server memakai server key
      // yang nilainya dikendalikan test. Sudah diverifikasi bahwa
      // process.loadEnvFile() di next.config.ts TIDAK menimpa variabel yang sudah
      // ada di process.env, jadi MIDTRANS_SERVER_KEY kosong di .env root tidak
      // menimpa nilai ini.
      MIDTRANS_SERVER_KEY: E2E_MIDTRANS_SERVER_KEY,
    },
  },
});
