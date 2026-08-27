import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  feedbackKindEnum,
  feedbackLabelEnum,
  feedbackReportTypeEnum,
} from "./enums";
import { lessons } from "./catalog";
import { users } from "./identity";

export const lessonFeedback = pgTable(
  "lesson_feedback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: feedbackKindEnum("kind").notNull(), // QUICK_FEEDBACK (FDB-001) atau ISSUE_REPORT (FDB-002)
    label: feedbackLabelEnum("label"), // hanya untuk QUICK_FEEDBACK
    reportType: feedbackReportTypeEnum("report_type"), // hanya untuk ISSUE_REPORT
    comment: text("comment"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("lesson_feedback_lesson_created_idx").on(t.lessonId, t.createdAt), // §13.3, FDB-003 admin list
  ],
);

export const adminAuditLogs = pgTable(
  "admin_audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorUserId: uuid("actor_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    action: text("action").notNull(), // mis. 'COURSE_PUBLISH', 'COURSE_PRICE_CHANGE', 'PROJECT_HIDE' — ADM-010
    entityType: text("entity_type").notNull(), // 'course' | 'lesson' | 'order' | 'project' | ...
    entityId: uuid("entity_id").notNull(),
    metadata: jsonb("metadata"), // before/after value bebas bentuk
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("admin_audit_logs_entity_idx").on(
      t.entityType,
      t.entityId,
      t.createdAt,
    ),
    index("admin_audit_logs_actor_idx").on(t.actorUserId, t.createdAt),
  ],
);
