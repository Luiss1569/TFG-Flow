/*
  Warnings:

  - A unique constraint covering the columns `[first_step_id]` on the table `workflows` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "workflows" ADD COLUMN     "first_step_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "workflows_first_step_id_key" ON "workflows"("first_step_id");
