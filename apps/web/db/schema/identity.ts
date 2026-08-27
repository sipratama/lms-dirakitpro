import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { authProviderEnum, userRoleEnum } from "./enums";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    role: userRoleEnum("role").notNull().default("LEARNER"),
    displayName: text("display_name").notNull(),
    email: text("email").notNull(), // dicermin dari Clerk, disinkronkan via webhook — docs/DATA-MODEL.md §3.2.1
    avatarUrl: text("avatar_url"),
    deletedAt: timestamp("deleted_at", { withTimezone: true }), // §1.6 — diisi saat webhook Clerk user.deleted diterima
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("users_email_unique").on(t.email)],
);

export const authIdentities = pgTable(
  "auth_identities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: authProviderEnum("provider").notNull().default("CLERK"),
    providerUserId: text("provider_user_id").notNull(), // Clerk user id
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // IAM-001: satu identitas provider hanya boleh mengarah ke satu User.
    uniqueIndex("auth_identities_provider_unique").on(
      t.provider,
      t.providerUserId,
    ),
    index("auth_identities_user_idx").on(t.userId),
  ],
);
