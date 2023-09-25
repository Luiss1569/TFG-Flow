/*
  Warnings:

  - You are about to drop the column `user_id` on the `request_answers_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `step_id` to the `activity_workflow_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_id` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_workflow_step_id` to the `request_answers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "form_types" AS ENUM ('public', 'private');

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_status_id_fkey";

-- DropForeignKey
ALTER TABLE "request_answers_users" DROP CONSTRAINT "request_answers_users_user_id_fkey";

-- AlterTable
ALTER TABLE "activity_workflow_steps" ADD COLUMN     "step_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "form_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "form_type" "form_types" NOT NULL DEFAULT 'public',
ALTER COLUMN "status_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "request_answers" ADD COLUMN     "activity_workflow_step_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "request_answers_users" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teachers_user_id_key" ON "teachers"("user_id");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_workflow_steps" ADD CONSTRAINT "activity_workflow_steps_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_answers" ADD CONSTRAINT "request_answers_activity_workflow_step_id_fkey" FOREIGN KEY ("activity_workflow_step_id") REFERENCES "activity_workflow_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
