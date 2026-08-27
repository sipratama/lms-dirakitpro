import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { questionTypeEnum } from "./enums";
import { lessons } from "./catalog";
import { users } from "./identity";
import { enrollments } from "./enrollment";

export const checkpointConfigs = pgTable(
  "checkpoint_configs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    passingScore: integer("passing_score").notNull(), // persen 0-100, CHK-002
    allowRetry: boolean("allow_retry").notNull().default(true), // CHK-003 tanpa batas keras
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // Satu lesson bertipe CHECKPOINT hanya boleh punya satu config (1:1).
    uniqueIndex("checkpoint_configs_lesson_unique").on(t.lessonId),
  ],
);

export const checkpointQuestions = pgTable(
  "checkpoint_questions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    checkpointConfigId: uuid("checkpoint_config_id")
      .notNull()
      .references(() => checkpointConfigs.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
    prompt: text("prompt").notNull(),
    type: questionTypeEnum("type").notNull(), // CHK-001
    explanation: text("explanation"), // ditampilkan setelah submit, CHK-002
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("checkpoint_questions_config_order_unique").on(
      t.checkpointConfigId,
      t.order,
    ),
  ],
);

export const checkpointQuestionOptions = pgTable(
  "checkpoint_question_options",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => checkpointQuestions.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
    label: text("label").notNull(),
    isCorrect: boolean("is_correct").notNull().default(false), // tidak pernah dikirim ke client sebelum submit — app-layer
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("checkpoint_options_question_order_unique").on(
      t.questionId,
      t.order,
    ),
  ],
);

export const checkpointAttempts = pgTable(
  "checkpoint_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    checkpointConfigId: uuid("checkpoint_config_id")
      .notNull()
      .references(() => checkpointConfigs.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    enrollmentId: uuid("enrollment_id")
      .notNull()
      .references(() => enrollments.id, { onDelete: "cascade" }),
    score: integer("score").notNull(), // 0-100
    passed: boolean("passed").notNull(), // CHK-004
    // Snapshot jawaban per pertanyaan → opsi terpilih, untuk riwayat (CHK-003) tanpa tabel jawaban terpisah.
    answers: jsonb("answers").$type<Record<string, string[]>>().notNull(),
    attemptedAt: timestamp("attempted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // Riwayat percobaan per learner+checkpoint, terurut waktu (CHK-003, §13.3 checkpoint failure rate).
    index("checkpoint_attempts_config_user_idx").on(
      t.checkpointConfigId,
      t.userId,
      t.attemptedAt,
    ),
    index("checkpoint_attempts_enrollment_idx").on(t.enrollmentId),
  ],
);
