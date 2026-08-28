import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import "./env";

// Sengaja TIDAK memakai `@/db/client` (db). Client itu dibuat untuk proses server
// Next.js yang hidup terus; di proses Playwright kita butuh kontrol eksplisit untuk
// menutup koneksi di akhir worker, kalau tidak proses test menggantung.
const queryClient = postgres(process.env.DATABASE_URL ?? "", { max: 2 });

export const db = drizzle(queryClient, { schema });

export async function closeDb() {
  await queryClient.end({ timeout: 5 });
}
