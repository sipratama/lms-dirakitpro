import { readFileSync } from "node:fs";
import path from "node:path";
import { test as base } from "@playwright/test";
import { closeDb } from "./db";
import {
  OTHER_LEARNER_EMAIL,
  deleteCourseFixture,
  seedAdminUser,
  seedPaidCourse,
  uniqueCourseSlug,
  upsertUser,
} from "./seed";

export const AUTH_CONTEXT_FILE = path.resolve(
  __dirname,
  "../.auth/learner-context.json",
);

export type AuthContext = {
  clerkUserId: string;
  internalUserId: string;
  email: string;
};

/**
 * Ditulis oleh e2e/auth.setup.ts setelah login Clerk berhasil dan baris
 * users/auth_identities-nya di-seed. Hanya boleh dipanggil dari spec yang sudah
 * di-skip ketika HAS_CLERK_AUTH false.
 */
export function readAuthContext(): AuthContext {
  return JSON.parse(readFileSync(AUTH_CONTEXT_FILE, "utf8")) as AuthContext;
}

type CourseFixture = { id: string; slug: string; priceAmount: number };

type WorkerFixtures = {
  adminUserId: string;
  /** Learner yang hanya ada di DB (tanpa identitas Clerk) — untuk spec non-browser. */
  dbOnlyLearnerUserId: string;
  closeDbConnection: undefined;
};

type TestFixtures = {
  /**
   * Satu course PUBLISHED berbayar yang eksklusif milik test ini, dibersihkan
   * setelah test selesai. Lihat catatan isolasi di support/seed.ts.
   */
  course: CourseFixture;
};

// Parameter kedua tiap fixture Playwright biasanya dinamai `use`. Di sini sengaja
// dinamai `provide`: eslint-config-next mengaktifkan react-hooks/rules-of-hooks,
// yang menyangka `use(...)` adalah React Hook `use` dan menolaknya karena dipanggil
// di fungsi yang bukan komponen/hook. Mengganti nama parameter menyelesaikannya
// tanpa perlu menyentuh eslint.config.mjs.
export const test = base.extend<TestFixtures, WorkerFixtures>({
  adminUserId: [
    async ({}, provide) => {
      await provide(await seedAdminUser());
    },
    { scope: "worker" },
  ],

  dbOnlyLearnerUserId: [
    async ({}, provide) => {
      const id = await upsertUser({
        email: OTHER_LEARNER_EMAIL,
        displayName: "E2E Learner Lain",
      });
      await provide(id);
    },
    { scope: "worker" },
  ],

  // Auto-fixture: tutup pool Postgres saat worker selesai, kalau tidak proses
  // Playwright menggantung menunggu koneksi idle.
  closeDbConnection: [
    async ({}, provide) => {
      await provide(undefined);
      await closeDb();
    },
    { scope: "worker", auto: true },
  ],

  course: async ({ adminUserId }, provide) => {
    const course = await seedPaidCourse({
      slug: uniqueCourseSlug(),
      createdByUserId: adminUserId,
    });
    await provide(course);
    await deleteCourseFixture(course.id);
  },
});

export { expect } from "@playwright/test";
