ALTER TYPE "public"."job_info_experience_level" RENAME TO "job_infos_experience_level";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "image_url" TO "imageUrl";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "job_info" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "job_info" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "job_info" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "job_info_id" TO "jobInfoId";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "hume_chat_id" TO "humeChatId";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "questions" RENAME COLUMN "job_info_id" TO "jobInfoId";--> statement-breakpoint
ALTER TABLE "questions" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "questions" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "job_info" DROP CONSTRAINT "job_info_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_job_info_id_job_info_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_job_info_id_job_info_id_fk";
--> statement-breakpoint
ALTER TABLE "job_info" ADD CONSTRAINT "job_info_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_jobInfoId_job_info_id_fk" FOREIGN KEY ("jobInfoId") REFERENCES "public"."job_info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_jobInfoId_job_info_id_fk" FOREIGN KEY ("jobInfoId") REFERENCES "public"."job_info"("id") ON DELETE cascade ON UPDATE no action;