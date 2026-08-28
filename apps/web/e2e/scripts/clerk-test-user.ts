/**
 * Membuat / menghapus SATU user khusus E2E di Clerk *development instance*.
 *
 *   node e2e/scripts/clerk-test-user.ts create
 *   node e2e/scripts/clerk-test-user.ts delete
 *   node e2e/scripts/clerk-test-user.ts status
 *
 * Sengaja dipisah dari auth.setup.ts dan TIDAK pernah jalan otomatis: membuat user
 * mengubah state di layanan eksternal (akun Clerk), jadi harus selalu tindakan
 * eksplisit. Memakai fetch biasa ke Clerk Backend API supaya tidak menambah
 * dependency baru.
 *
 * Butuh di .env root: CLERK_SECRET_KEY (sk_test_*), E2E_CLERK_USER_EMAIL,
 * E2E_CLERK_USER_PASSWORD. Script menolak jalan kalau key-nya sk_live_*.
 */
import { existsSync } from "node:fs";
import path from "node:path";

// Tidak memakai support/env.ts di sini dengan sengaja: file ini dijalankan
// langsung oleh Node (`node e2e/scripts/clerk-test-user.ts`), dan Node memuat .ts
// ber-`import` sebagai ESM — sementara support/env.ts memakai `__dirname` karena
// Playwright mentranspilasi spec ke CommonJS. Jadi pemuatan .env-nya diulang di
// sini dalam bentuk ESM, cukup beberapa baris.
const rootEnv = path.resolve(import.meta.dirname, "../../../../.env");
if (existsSync(rootEnv)) process.loadEnvFile(rootEnv);

const SECRET = process.env.CLERK_SECRET_KEY ?? "";
const EMAIL = process.env.E2E_CLERK_USER_EMAIL ?? "";
const PASSWORD = process.env.E2E_CLERK_USER_PASSWORD ?? "";
const API = "https://api.clerk.com/v1";

function required(name: string, value: string) {
  if (!value) {
    console.error(`[clerk-test-user] ${name} belum diisi di .env root.`);
    process.exit(1);
  }
}

required("CLERK_SECRET_KEY", SECRET);
required("E2E_CLERK_USER_EMAIL", EMAIL);

if (SECRET.startsWith("sk_live_")) {
  console.error(
    "[clerk-test-user] MENOLAK jalan: CLERK_SECRET_KEY adalah key production. " +
      "Script ini hanya untuk development instance (sk_test_*).",
  );
  process.exit(1);
}

async function api(path: string, init?: RequestInit) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Clerk API ${path} gagal (${response.status}): ${JSON.stringify(body)}`,
    );
  }
  return body;
}

async function findUser(): Promise<{ id: string } | null> {
  const list = (await api(
    `/users?email_address=${encodeURIComponent(EMAIL)}&limit=1`,
  )) as Array<{ id: string }>;
  return list?.[0] ?? null;
}

// Dibungkus main() (bukan top-level await) supaya file ini tetap dieksekusi Node
// sebagai CommonJS. Top-level await memaksa mode ESM, dan di ESM `__dirname` yang
// dipakai support/env.ts tidak ada.
async function main() {
  const command = process.argv[2] ?? "status";

  if (command === "status") {
    const existing = await findUser();
    console.log(
      existing
        ? `[clerk-test-user] ADA: ${EMAIL} (${existing.id})`
        : `[clerk-test-user] TIDAK ADA: ${EMAIL}`,
    );
    return;
  }

  if (command === "create") {
    required("E2E_CLERK_USER_PASSWORD", PASSWORD);
    const existing = await findUser();
    if (existing) {
      console.log(`[clerk-test-user] sudah ada, dilewati: ${existing.id}`);
      return;
    }
    const created = (await api("/users", {
      method: "POST",
      body: JSON.stringify({
        email_address: [EMAIL],
        password: PASSWORD,
        // Password fixture memang bukan password bagus; lewati cek breach/strength.
        skip_password_checks: true,
        first_name: "E2E",
        last_name: "Learner",
      }),
    })) as { id: string };
    console.log(`[clerk-test-user] dibuat: ${created.id}`);
    return;
  }

  if (command === "delete") {
    const existing = await findUser();
    if (!existing) {
      console.log("[clerk-test-user] tidak ada yang dihapus.");
      return;
    }
    await api(`/users/${existing.id}`, { method: "DELETE" });
    console.log(`[clerk-test-user] dihapus: ${existing.id}`);
    return;
  }

  console.error(`[clerk-test-user] perintah tidak dikenal: ${command}`);
  process.exit(1);
}

main().catch((error) => {
  console.error(`[clerk-test-user] ${error.message}`);
  process.exit(1);
});
