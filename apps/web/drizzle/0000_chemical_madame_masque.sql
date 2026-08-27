CREATE TYPE "public"."auth_provider" AS ENUM('CLERK');--> statement-breakpoint
CREATE TYPE "public"."course_level" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED');--> statement-breakpoint
CREATE TYPE "public"."course_status" AS ENUM('DRAFT', 'PUBLISHED', 'UNPUBLISHED');--> statement-breakpoint
CREATE TYPE "public"."enrollment_source" AS ENUM('FREE', 'PAID');--> statement-breakpoint
CREATE TYPE "public"."enrollment_status" AS ENUM('ACTIVE', 'COMPLETED', 'REVOKED');--> statement-breakpoint
CREATE TYPE "public"."feedback_kind" AS ENUM('QUICK_FEEDBACK', 'ISSUE_REPORT');--> statement-breakpoint
CREATE TYPE "public"."feedback_label" AS ENUM('MUDAH_DIPAHAMI', 'MEMBINGUNGKAN');--> statement-breakpoint
CREATE TYPE "public"."feedback_report_type" AS ENUM('TYPO', 'BROKEN_LINK', 'OUTDATED_INSTRUCTION', 'CODE_NOT_WORKING', 'IMAGE_ISSUE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."lesson_content_status" AS ENUM('DRAFT', 'PUBLISHED');--> statement-breakpoint
CREATE TYPE "public"."lesson_progress_status" AS ENUM('NOT_STARTED', 'STARTED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."lesson_type" AS ENUM('CONCEPT', 'DEMO', 'BUILD', 'CHECKPOINT', 'DEPLOY');--> statement-breakpoint
CREATE TYPE "public"."media_owner_scope" AS ENUM('ADMIN_CONTENT', 'LEARNER_PROJECT');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'PAID', 'EXPIRED', 'CANCELLED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'CANCELLED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."project_moderation_status" AS ENUM('VISIBLE', 'HIDDEN');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('DRAFT', 'SUBMITTED');--> statement-breakpoint
CREATE TYPE "public"."project_visibility" AS ENUM('PRIVATE', 'PUBLIC');--> statement-breakpoint
CREATE TYPE "public"."question_type" AS ENUM('SINGLE_CHOICE', 'MULTIPLE_CHOICE');--> statement-breakpoint
CREATE TYPE "public"."refund_status" AS ENUM('PENDING', 'SUCCESS', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('REPOSITORY', 'ASSET_FILE', 'DOCUMENTATION', 'REFERENCE', 'TOOLING');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('LEARNER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "auth_identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" "auth_provider" DEFAULT 'CLERK' NOT NULL,
	"provider_user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "user_role" DEFAULT 'LEARNER' NOT NULL,
	"display_name" text NOT NULL,
	"email" text NOT NULL,
	"avatar_url" text,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_scope" "media_owner_scope" NOT NULL,
	"course_id" uuid,
	"storage_provider" text DEFAULT 'R2' NOT NULL,
	"storage_key" text NOT NULL,
	"public_url" text,
	"mime_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"width" integer,
	"height" integer,
	"original_filename_sanitized" text NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"type" "resource_type" NOT NULL,
	"label" text NOT NULL,
	"url" text,
	"asset_id" uuid,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_stages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"title" text NOT NULL,
	"outcome" text,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_outcome" text NOT NULL,
	"description" text NOT NULL,
	"target_learner" text,
	"prerequisites" jsonb DEFAULT '[]'::jsonb,
	"required_tools" jsonb DEFAULT '[]'::jsonb,
	"final_outcome_description" text,
	"final_project_config" jsonb NOT NULL,
	"level" "course_level" DEFAULT 'BEGINNER' NOT NULL,
	"is_free" boolean DEFAULT false NOT NULL,
	"price_amount" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'IDR' NOT NULL,
	"status" "course_status" DEFAULT 'DRAFT' NOT NULL,
	"thumbnail_asset_id" uuid,
	"estimated_duration_minutes" integer,
	"is_sequential" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"created_by_user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "courses_price_consistency" CHECK (("courses"."is_free" = true and "courses"."price_amount" = 0) or ("courses"."is_free" = false and "courses"."price_amount" > 0))
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stage_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"type" "lesson_type" NOT NULL,
	"objective" text,
	"estimated_time_minutes" integer,
	"content" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_required" boolean DEFAULT true NOT NULL,
	"order" integer NOT NULL,
	"content_status" "lesson_content_status" DEFAULT 'DRAFT' NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lessons_content_is_array" CHECK (jsonb_typeof("lessons"."content") = 'array')
);
--> statement-breakpoint
CREATE TABLE "checkpoint_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"checkpoint_config_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"enrollment_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"passed" boolean NOT NULL,
	"answers" jsonb NOT NULL,
	"attempted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "checkpoint_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"passing_score" integer NOT NULL,
	"allow_retry" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "checkpoint_question_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"label" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "checkpoint_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"checkpoint_config_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"prompt" text NOT NULL,
	"type" "question_type" NOT NULL,
	"explanation" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "build_milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"is_required" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_milestone_map" (
	"milestone_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lesson_milestone_map_milestone_id_lesson_id_pk" PRIMARY KEY("milestone_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"status" "enrollment_status" DEFAULT 'ACTIVE' NOT NULL,
	"source" "enrollment_source" NOT NULL,
	"activated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enrollment_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "lesson_progress_status" DEFAULT 'NOT_STARTED' NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"course_title_snapshot" text NOT NULL,
	"price_amount_snapshot" integer NOT NULL,
	"currency_snapshot" text NOT NULL,
	"total_amount" integer NOT NULL,
	"status" "order_status" DEFAULT 'PENDING' NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"provider" text DEFAULT 'MIDTRANS' NOT NULL,
	"provider_order_id" text NOT NULL,
	"provider_transaction_id" text,
	"status" "payment_status" DEFAULT 'PENDING' NOT NULL,
	"raw_provider_status" text,
	"amount" integer NOT NULL,
	"payment_type" text,
	"signature_verified" boolean DEFAULT false NOT NULL,
	"webhook_payload" jsonb,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refunds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"payment_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"reason" text,
	"status" "refund_status" DEFAULT 'PENDING' NOT NULL,
	"provider_refund_id" text,
	"raw_provider_response" jsonb,
	"processed_by_user_id" uuid,
	"requested_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "project_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"live_url" text,
	"repo_url" text,
	"screenshot_asset_id" uuid,
	"technologies" jsonb DEFAULT '[]'::jsonb,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enrollment_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"status" "project_status" DEFAULT 'DRAFT' NOT NULL,
	"visibility" "project_visibility" DEFAULT 'PRIVATE' NOT NULL,
	"moderation_status" "project_moderation_status" DEFAULT 'VISIBLE' NOT NULL,
	"public_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" uuid NOT NULL,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" "feedback_kind" NOT NULL,
	"label" "feedback_label",
	"report_type" "feedback_report_type",
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth_identities" ADD CONSTRAINT "auth_identities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_resources" ADD CONSTRAINT "course_resources_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_resources" ADD CONSTRAINT "course_resources_asset_id_media_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_stages" ADD CONSTRAINT "course_stages_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_thumbnail_asset_id_media_assets_id_fk" FOREIGN KEY ("thumbnail_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_stage_id_course_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."course_stages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkpoint_attempts" ADD CONSTRAINT "checkpoint_attempts_checkpoint_config_id_checkpoint_configs_id_fk" FOREIGN KEY ("checkpoint_config_id") REFERENCES "public"."checkpoint_configs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkpoint_attempts" ADD CONSTRAINT "checkpoint_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkpoint_attempts" ADD CONSTRAINT "checkpoint_attempts_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkpoint_configs" ADD CONSTRAINT "checkpoint_configs_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkpoint_question_options" ADD CONSTRAINT "checkpoint_question_options_question_id_checkpoint_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."checkpoint_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkpoint_questions" ADD CONSTRAINT "checkpoint_questions_checkpoint_config_id_checkpoint_configs_id_fk" FOREIGN KEY ("checkpoint_config_id") REFERENCES "public"."checkpoint_configs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_milestones" ADD CONSTRAINT "build_milestones_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_milestone_map" ADD CONSTRAINT "lesson_milestone_map_milestone_id_build_milestones_id_fk" FOREIGN KEY ("milestone_id") REFERENCES "public"."build_milestones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_milestone_map" ADD CONSTRAINT "lesson_milestone_map_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_processed_by_user_id_users_id_fk" FOREIGN KEY ("processed_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_submissions" ADD CONSTRAINT "project_submissions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_submissions" ADD CONSTRAINT "project_submissions_screenshot_asset_id_media_assets_id_fk" FOREIGN KEY ("screenshot_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_feedback" ADD CONSTRAINT "lesson_feedback_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_feedback" ADD CONSTRAINT "lesson_feedback_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "auth_identities_provider_unique" ON "auth_identities" USING btree ("provider","provider_user_id");--> statement-breakpoint
CREATE INDEX "auth_identities_user_idx" ON "auth_identities" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "media_assets_storage_key_unique" ON "media_assets" USING btree ("storage_key");--> statement-breakpoint
CREATE INDEX "media_assets_course_scope_idx" ON "media_assets" USING btree ("course_id","owner_scope");--> statement-breakpoint
CREATE INDEX "course_resources_course_order_idx" ON "course_resources" USING btree ("course_id","order");--> statement-breakpoint
CREATE UNIQUE INDEX "course_stages_course_order_unique" ON "course_stages" USING btree ("course_id","order");--> statement-breakpoint
CREATE UNIQUE INDEX "courses_slug_unique" ON "courses" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "courses_status_idx" ON "courses" USING btree ("status") WHERE "courses"."deleted_at" is null;--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_course_slug_unique" ON "lessons" USING btree ("course_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_stage_order_unique" ON "lessons" USING btree ("stage_id","order");--> statement-breakpoint
CREATE INDEX "lessons_course_type_idx" ON "lessons" USING btree ("course_id","type");--> statement-breakpoint
CREATE INDEX "checkpoint_attempts_config_user_idx" ON "checkpoint_attempts" USING btree ("checkpoint_config_id","user_id","attempted_at");--> statement-breakpoint
CREATE INDEX "checkpoint_attempts_enrollment_idx" ON "checkpoint_attempts" USING btree ("enrollment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "checkpoint_configs_lesson_unique" ON "checkpoint_configs" USING btree ("lesson_id");--> statement-breakpoint
CREATE UNIQUE INDEX "checkpoint_options_question_order_unique" ON "checkpoint_question_options" USING btree ("question_id","order");--> statement-breakpoint
CREATE UNIQUE INDEX "checkpoint_questions_config_order_unique" ON "checkpoint_questions" USING btree ("checkpoint_config_id","order");--> statement-breakpoint
CREATE UNIQUE INDEX "build_milestones_course_order_unique" ON "build_milestones" USING btree ("course_id","order");--> statement-breakpoint
CREATE INDEX "lesson_milestone_map_lesson_idx" ON "lesson_milestone_map" USING btree ("lesson_id");--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_user_course_unique" ON "enrollments" USING btree ("user_id","course_id");--> statement-breakpoint
CREATE INDEX "enrollments_course_status_idx" ON "enrollments" USING btree ("course_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_enrollment_lesson_unique" ON "lesson_progress" USING btree ("enrollment_id","lesson_id");--> statement-breakpoint
CREATE INDEX "lesson_progress_lesson_status_idx" ON "lesson_progress" USING btree ("lesson_id","status");--> statement-breakpoint
CREATE INDEX "lesson_progress_user_status_idx" ON "lesson_progress" USING btree ("user_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_pending_user_course_unique" ON "orders" USING btree ("user_id","course_id") WHERE "orders"."status" = 'PENDING';--> statement-breakpoint
CREATE INDEX "orders_status_created_idx" ON "orders" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "orders_user_idx" ON "orders" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "payments_provider_order_unique" ON "payments" USING btree ("provider_order_id");--> statement-breakpoint
CREATE INDEX "payments_order_idx" ON "payments" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "refunds_order_idx" ON "refunds" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "refunds_status_idx" ON "refunds" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "project_submissions_project_unique" ON "project_submissions" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_enrollment_unique" ON "projects" USING btree ("enrollment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_public_slug_unique" ON "projects" USING btree ("public_slug");--> statement-breakpoint
CREATE INDEX "projects_visibility_moderation_idx" ON "projects" USING btree ("visibility","moderation_status");--> statement-breakpoint
CREATE INDEX "admin_audit_logs_entity_idx" ON "admin_audit_logs" USING btree ("entity_type","entity_id","created_at");--> statement-breakpoint
CREATE INDEX "admin_audit_logs_actor_idx" ON "admin_audit_logs" USING btree ("actor_user_id","created_at");--> statement-breakpoint
CREATE INDEX "lesson_feedback_lesson_created_idx" ON "lesson_feedback" USING btree ("lesson_id","created_at");