import { pgEnum } from "drizzle-orm/pg-core";

// ---- Identity ----
export const userRoleEnum = pgEnum("user_role", ["LEARNER", "ADMIN"]);
export const authProviderEnum = pgEnum("auth_provider", ["CLERK"]);

// ---- Catalog ----
export const courseStatusEnum = pgEnum("course_status", [
  "DRAFT",
  "PUBLISHED",
  "UNPUBLISHED",
]); // §10.6, CAT-003
export const courseLevelEnum = pgEnum("course_level", [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]); // §5 keputusan #7 di docs/DATA-MODEL.md — dikonfirmasi final
export const resourceTypeEnum = pgEnum("resource_type", [
  "REPOSITORY",
  "ASSET_FILE",
  "DOCUMENTATION",
  "REFERENCE",
  "TOOLING",
]); // LRN-008

// ---- Curriculum ----
export const lessonTypeEnum = pgEnum("lesson_type", [
  "CONCEPT",
  "DEMO",
  "BUILD",
  "CHECKPOINT",
  "DEPLOY",
]); // LRN-004
export const lessonContentStatusEnum = pgEnum("lesson_content_status", [
  "DRAFT",
  "PUBLISHED",
]); // §10.6 — lesson publish independen dari course publish
export const lessonProgressStatusEnum = pgEnum("lesson_progress_status", [
  "NOT_STARTED",
  "STARTED",
  "COMPLETED",
]); // §10.3

// ---- Checkpoint ----
export const questionTypeEnum = pgEnum("question_type", [
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
]); // CHK-001

// ---- Commerce ----
export const orderStatusEnum = pgEnum("order_status", [
  "PENDING",
  "PAID",
  "EXPIRED",
  "CANCELLED",
  "REFUNDED",
]); // §10.1
export const paymentStatusEnum = pgEnum("payment_status", [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "EXPIRED",
  "CANCELLED",
  "REFUNDED",
]); // status Midtrans dinormalisasi ke set internal ini (ADM-008)
export const refundStatusEnum = pgEnum("refund_status", [
  "PENDING",
  "SUCCESS",
  "FAILED",
]); // §5 keputusan #10
export const enrollmentStatusEnum = pgEnum("enrollment_status", [
  "ACTIVE",
  "COMPLETED",
  "REVOKED",
]); // §10.2
export const enrollmentSourceEnum = pgEnum("enrollment_source", [
  "FREE",
  "PAID",
]);

// ---- Project ----
export const projectStatusEnum = pgEnum("project_status", [
  "DRAFT",
  "SUBMITTED",
]); // §10.4
export const projectVisibilityEnum = pgEnum("project_visibility", [
  "PRIVATE",
  "PUBLIC",
]); // §10.4
export const projectModerationStatusEnum = pgEnum("project_moderation_status", [
  "VISIBLE",
  "HIDDEN",
]); // §10.4, PRJ-006

// ---- Media ----
export const mediaOwnerScopeEnum = pgEnum("media_owner_scope", [
  "ADMIN_CONTENT",
  "LEARNER_PROJECT",
]); // §11.3

// ---- Feedback ----
export const feedbackKindEnum = pgEnum("feedback_kind", [
  "QUICK_FEEDBACK",
  "ISSUE_REPORT",
]);
export const feedbackLabelEnum = pgEnum("feedback_label", [
  "MUDAH_DIPAHAMI",
  "MEMBINGUNGKAN",
]); // FDB-001 — label tetap Bahasa Indonesia (copy learner-facing)
export const feedbackReportTypeEnum = pgEnum("feedback_report_type", [
  "TYPO",
  "BROKEN_LINK",
  "OUTDATED_INSTRUCTION",
  "CODE_NOT_WORKING",
  "IMAGE_ISSUE",
  "OTHER",
]); // FDB-002
