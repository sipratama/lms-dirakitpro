import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { courses, lessons } from "./catalog";

export const buildMilestones = pgTable(
  "build_milestones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(), // mis. "Project Setup", "First Screen" (BLD-001)
    description: text("description"),
    order: integer("order").notNull(),
    isRequired: boolean("is_required").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("build_milestones_course_order_unique").on(t.courseId, t.order),
  ],
);

export const lessonMilestoneMap = pgTable(
  "lesson_milestone_map",
  {
    milestoneId: uuid("milestone_id")
      .notNull()
      .references(() => buildMilestones.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // BLD-002: satu lesson bisa dipetakan ke banyak milestone, tapi tidak boleh dobel ke milestone yang sama.
    primaryKey({ columns: [t.milestoneId, t.lessonId] }),
    index("lesson_milestone_map_lesson_idx").on(t.lessonId),
  ],
);
