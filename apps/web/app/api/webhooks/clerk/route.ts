import { and, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { db } from "@/db/client";
import { authIdentities, users } from "@/db/schema";

type ClerkUserData = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
};

// docs/DATA-MODEL.md §3.2.1 — upsert idempoten: cek auth_identities dulu, insert users+auth_identities
// kalau belum ada. Kalau ada race antar dua webhook delivery untuk user baru yang sama, insert kedua
// akan gagal karena unique constraint auth_identities_provider_unique, transaksi rollback total
// (termasuk users row spekulatif), lalu fallback ke update terhadap identity yang menang race.
async function upsertUserFromClerk(data: ClerkUserData) {
  const [existing] = await db
    .select({ userId: authIdentities.userId })
    .from(authIdentities)
    .where(
      and(
        eq(authIdentities.provider, "CLERK"),
        eq(authIdentities.providerUserId, data.id),
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .update(users)
      .set({
        email: data.email,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
      })
      .where(eq(users.id, existing.userId));
    return;
  }

  try {
    await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(users)
        .values({
          email: data.email,
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
        })
        .returning({ id: users.id });

      await tx.insert(authIdentities).values({
        userId: newUser.id,
        provider: "CLERK",
        providerUserId: data.id,
      });
    });
  } catch (error) {
    const [existingAfterRace] = await db
      .select({ userId: authIdentities.userId })
      .from(authIdentities)
      .where(
        and(
          eq(authIdentities.provider, "CLERK"),
          eq(authIdentities.providerUserId, data.id),
        ),
      )
      .limit(1);

    if (!existingAfterRace) {
      throw error;
    }

    await db
      .update(users)
      .set({
        email: data.email,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
      })
      .where(eq(users.id, existingAfterRace.userId));
  }
}

async function softDeleteUser(clerkUserId: string) {
  const [existing] = await db
    .select({ userId: authIdentities.userId })
    .from(authIdentities)
    .where(
      and(
        eq(authIdentities.provider, "CLERK"),
        eq(authIdentities.providerUserId, clerkUserId),
      ),
    )
    .limit(1);

  if (!existing) return;

  await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(eq(users.id, existing.userId));
}

export async function POST(request: NextRequest) {
  let event;
  try {
    event = await verifyWebhook(request);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const { data } = event;
      const primaryEmail = data.email_addresses.find(
        (e) => e.id === data.primary_email_address_id,
      );
      if (!primaryEmail) {
        return Response.json(
          { error: "User has no primary email" },
          { status: 400 },
        );
      }

      const displayName =
        [data.first_name, data.last_name].filter(Boolean).join(" ") ||
        primaryEmail.email_address;

      await upsertUserFromClerk({
        id: data.id,
        email: primaryEmail.email_address,
        displayName,
        avatarUrl: data.image_url,
      });
      return Response.json({ received: true });
    }
    case "user.deleted": {
      if (event.data.id) {
        await softDeleteUser(event.data.id);
      }
      return Response.json({ received: true });
    }
    default:
      return Response.json({ received: true });
  }
}
