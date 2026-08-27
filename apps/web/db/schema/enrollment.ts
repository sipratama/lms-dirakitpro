import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  enrollmentSourceEnum,
  enrollmentStatusEnum,
  lessonProgressStatusEnum,
} from "./enums";
import { users } from "./identity";
import { courses, lessons } from "./catalog";

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    status: enrollmentStatusEnum("status").notNull().default("ACTIVE"), // §10.2
    source: enrollmentSourceEnum("source").notNull(), // FREE (CAT-004) atau PAID (webhook)
    activatedAt: timestamp("activated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // COM-005 (idempotent) + COM-007 (already-owned block) + "satu enrollment per user+course": backstop DB.
    uniqueIndex("enrollments_user_course_unique").on(t.userId, t.courseId),
    index("enrollments_course_status_idx").on(t.courseId, t.status), // admin learner view, funnel §13
  ],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    enrollmentId: uuid("enrollment_id")
      .notNull()
      .references(() => enrollments.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // denormalisasi, hindari join lewat enrollment untuk query admin/analytics
    status: lessonProgressStatusEnum("status").notNull().default("NOT_STARTED"), // §10.3
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("lesson_progress_enrollment_lesson_unique").on(
      t.enrollmentId,
      t.lessonId,
    ),
    // §13.3: "lesson mana yang paling banyak drop-off" — agregasi per lesson+status.
    index("lesson_progress_lesson_status_idx").on(t.lessonId, t.status),
    index("lesson_progress_user_status_idx").on(t.userId, t.status),
  ],
);
