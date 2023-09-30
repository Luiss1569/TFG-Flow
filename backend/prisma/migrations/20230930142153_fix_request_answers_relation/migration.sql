/*
  Warnings:

  - Added the required column `answersId` to the `request_answers_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `request_answers_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "activity_workflow_status" ADD VALUE 'in_queue';

-- DropForeignKey
ALTER TABLE "request_answers_users" DROP CONSTRAINT "request_answers_users_answer_id_fkey";

-- AlterTable
ALTER TABLE "activity_workflow_steps" ALTER COLUMN "status" SET DEFAULT 'inactive';

-- AlterTable
ALTER TABLE "request_answers_users" ADD COLUMN     "answersId" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "answer_id" DROP NOT NULL,
ADD CONSTRAINT "request_answers_users_pkey" PRIMARY KEY ("request_answer_id", "user_id");

-- AddForeignKey
ALTER TABLE "request_answers_users" ADD CONSTRAINT "request_answers_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_answers_users" ADD CONSTRAINT "request_answers_users_answersId_fkey" FOREIGN KEY ("answersId") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
