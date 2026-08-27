import {
  type AnyPgColumn,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { mediaOwnerScopeEnum } from "./enums";
import { users } from "./identity";
import { courses } from "./catalog";

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerScope: mediaOwnerScopeEnum("owner_scope").notNull(), // §11.3
    // AnyPgColumn: memutus circular type-inference dengan courses.thumbnailAssetId (lihat schema/catalog.ts).
    courseId: uuid("course_id").references((): AnyPgColumn => courses.id, {
      onDelete: "set null",
    }), // ADM-006 image library per-course (ADMIN_CONTENT)
    storageProvider: text("storage_provider").notNull().default("R2"),
    storageKey: text("storage_key").notNull(), // key acak, bukan nama file asli (§16)
    publicUrl: text("public_url"),
    mimeType: text("mime_type").notNull(),
    fileSize: integer("file_size").notNull(), // bytes, dicek <= 5MB di app-layer (MED-002)
    width: integer("width"),
    height: integer("height"),
    originalFilenameSanitized: text("original_filename_sanitized").notNull(),
    createdByUserId: uuid("created_by_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }), // §1.6 soft delete — cek referensi (MED-005) sebelum hard-delete objek storage
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("media_assets_storage_key_unique").on(t.storageKey),
    index("media_assets_course_scope_idx").on(t.courseId, t.ownerScope), // ADM-006 image library
  ],
);
