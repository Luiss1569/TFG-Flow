/*
  Warnings:

  - You are about to drop the column `answersId` on the `request_answers_users` table. All the data in the column will be lost.
  - Added the required column `invocation_id` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "request_answers_users" DROP CONSTRAINT "request_answers_users_answersId_fkey";

-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "invocation_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "request_answers_users" DROP COLUMN "answersId";

-- AddForeignKey
ALTER TABLE "request_answers_users" ADD CONSTRAINT "request_answers_users_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
