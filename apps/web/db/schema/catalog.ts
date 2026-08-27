import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  courseLevelEnum,
  courseStatusEnum,
  lessonContentStatusEnum,
  lessonTypeEnum,
  resourceTypeEnum,
} from "./enums";
import { users } from "./identity";
import { mediaAssets } from "./media";
import type { LessonContentBlock } from "./lesson-content";

export const courses = pgTable(
  "courses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    shortOutcome: text("short_outcome").notNull(), // CAT-001
    description: text("description").notNull(), // markdown, CAT-002
    targetLearner: text("target_learner"),
    prerequisites: jsonb("prerequisites").$type<string[]>().default([]),
    requiredTools: jsonb("required_tools").$type<string[]>().default([]),
    finalOutcomeDescription: text("final_outcome_description"), // CAT-002 "hasil akhir yang dibangun"
    // Konfigurasi field wajib untuk final project — tidak semua course butuh live URL (PRJ-003).
    finalProjectConfig: jsonb("final_project_config")
      .$type<{
        requireLiveUrl: boolean;
        requireRepoUrl: boolean;
        requireScreenshot: boolean;
        allowTechList: boolean;
      }>()
      .notNull(),
    level: courseLevelEnum("level").notNull().default("BEGINNER"),
    isFree: boolean("is_free").notNull().default(false), // CAT-004
    priceAmount: integer("price_amount").notNull().default(0), // rupiah, unit utuh (tanpa desimal)
    currency: text("currency").notNull().default("IDR"),
    status: courseStatusEnum("status").notNull().default("DRAFT"), // CAT-003
    // AnyPgColumn: memutus circular type-inference dengan mediaAssets.courseId (lihat schema/media.ts).
    thumbnailAssetId: uuid("thumbnail_asset_id").references(
      (): AnyPgColumn => mediaAssets.id,
      { onDelete: "set null" },
    ),
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
    isSequential: boolean("is_sequential").notNull().default(true), // LRN-007
    publishedAt: timestamp("published_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }), // §1.6 soft delete
    createdByUserId: uuid("created_by_user_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("courses_slug_unique").on(t.slug),
    // Katalog publik hanya boleh lihat yang PUBLISHED dan belum dihapus — partial index mempercepat filter ganda ini.
    index("courses_status_idx")
      .on(t.status)
      .where(sql`${t.deletedAt} is null`),
    // CAT-004 & harga: kalau free, harga wajib 0; kalau berbayar, harga > 0.
    check(
      "courses_price_consistency",
      sql`(${t.isFree} = true and ${t.priceAmount} = 0) or (${t.isFree} = false and ${t.priceAmount} > 0)`,
    ),
  ],
);

export const courseResources = pgTable(
  "course_resources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    type: resourceTypeEnum("type").notNull(),
    label: text("label").notNull(),
    url: text("url"), // untuk link (repo, dokumentasi, tooling)
    assetId: uuid("asset_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }), // untuk ASSET_FILE
    order: integer("order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("course_resources_course_order_idx").on(t.courseId, t.order)],
);

export const courseStages = pgTable(
  "course_stages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    outcome: text("outcome"), // Appendix C: "Stage outcome"
    order: integer("order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // ADM-003: reorder stage tanpa tabrakan urutan.
    uniqueIndex("course_stages_course_order_unique").on(t.courseId, t.order),
  ],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    stageId: uuid("stage_id")
      .notNull()
      .references(() => courseStages.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }), // denormalisasi untuk query & unique slug per-course
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    type: lessonTypeEnum("type").notNull(), // LRN-004
    objective: text("objective"),
    estimatedTimeMinutes: integer("estimated_time_minutes"),
    // LRN-005 & §11.2 — array block terurut, divalidasi Zod discriminated union di write boundary.
    content: jsonb("content")
      .$type<LessonContentBlock[]>()
      .notNull()
      .default([]),
    isRequired: boolean("is_required").notNull().default(true), // LRN-007
    order: integer("order").notNull(), // urutan dalam stage
    contentStatus: lessonContentStatusEnum("content_status")
      .notNull()
      .default("DRAFT"), // §10.6
    deletedAt: timestamp("deleted_at", { withTimezone: true }), // §1.6 soft delete
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("lessons_course_slug_unique").on(t.courseId, t.slug), // route /learn/[courseSlug]/[lessonSlug]
    uniqueIndex("lessons_stage_order_unique").on(t.stageId, t.order),
    index("lessons_course_type_idx").on(t.courseId, t.type), // agregasi required lesson per course (§10.5)
    // Pengaman minimal DB selain Zod discriminated union app-layer: content SELALU array JSON.
    check(
      "lessons_content_is_array",
      sql`jsonb_typeof(${t.content}) = 'array'`,
    ),
  ],
);
