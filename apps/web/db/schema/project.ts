import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  projectModerationStatusEnum,
  projectStatusEnum,
  projectVisibilityEnum,
} from "./enums";
import { enrollments } from "./enrollment";
import { users } from "./identity";
import { courses } from "./catalog";
import { mediaAssets } from "./media";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    enrollmentId: uuid("enrollment_id")
      .notNull()
      .references(() => enrollments.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // denormalisasi
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }), // denormalisasi
    status: projectStatusEnum("status").notNull().default("DRAFT"), // §10.4, PRJ-001 auto-create
    visibility: projectVisibilityEnum("visibility")
      .notNull()
      .default("PRIVATE"), // PRJ-004
    moderationStatus: projectModerationStatusEnum("moderation_status")
      .notNull()
      .default("VISIBLE"), // PRJ-006
    publicSlug: text("public_slug"), // untuk /projects/[username]/[slug], hanya terisi saat pertama kali PUBLIC
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("projects_enrollment_unique").on(t.enrollmentId), // 1 project per enrollment
    uniqueIndex("projects_public_slug_unique").on(t.publicSlug),
    // PRJ-005/006: query halaman publik & moderasi admin.
    index("projects_visibility_moderation_idx").on(
      t.visibility,
      t.moderationStatus,
    ),
  ],
);

// Diasumsikan submission di-edit in-place (bukan tabel riwayat versi) — docs/DATA-MODEL.md §5 keputusan #3 (YAGNI).
export const projectSubmissions = pgTable(
  "project_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    liveUrl: text("live_url"), // divalidasi http(s) di app-layer, PRJ-003
    repoUrl: text("repo_url"),
    screenshotAssetId: uuid("screenshot_asset_id").references(
      () => mediaAssets.id,
      { onDelete: "set null" },
    ),
    technologies: jsonb("technologies").$type<string[]>().default([]),
    submittedAt: timestamp("submitted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("project_submissions_project_unique").on(t.projectId)],
);
