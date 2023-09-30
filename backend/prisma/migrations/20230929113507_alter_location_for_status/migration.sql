/*
  Warnings:

  - You are about to drop the column `status` on the `activity_workflow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activity_workflow" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "activity_workflow_steps" ADD COLUMN     "status" "activity_workflow_status" NOT NULL DEFAULT 'in_progress';
