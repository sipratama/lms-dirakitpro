import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { authIdentities, users } from "@/db/schema";

// docs/DATA-MODEL.md §3.2.1 — source of truth peran ada di tabel `users` internal
// (IAM-004), bukan di Clerk. Dipakai oleh resource-based auth check di layout
// (admin), lihat https://clerk.com/docs/guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher
export async function getUserRoleByClerkId(clerkUserId: string) {
  const [row] = await db
    .select({ role: users.role })
    .from(users)
    .innerJoin(authIdentities, eq(authIdentities.userId, users.id))
    .where(
      and(
        eq(authIdentities.provider, "CLERK"),
        eq(authIdentities.providerUserId, clerkUserId),
      ),
    )
    .limit(1);
  return row?.role ?? null;
}

// Dipakai di server flow yang butuh `users.id` internal (mis. checkout langkah 10),
// terpisah dari getUserRoleByClerkId supaya pemanggilnya di app/(admin)/layout.tsx tidak berubah.
export async function getInternalUserIdByClerkId(clerkUserId: string) {
  const [row] = await db
    .select({ id: users.id })
    .from(users)
    .innerJoin(authIdentities, eq(authIdentities.userId, users.id))
    .where(
      and(
        eq(authIdentities.provider, "CLERK"),
        eq(authIdentities.providerUserId, clerkUserId),
      ),
    )
    .limit(1);
  return row?.id ?? null;
}
