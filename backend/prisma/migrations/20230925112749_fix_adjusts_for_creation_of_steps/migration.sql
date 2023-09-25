/*
  Warnings:

  - A unique constraint covering the columns `[workflow_id,identifier]` on the table `steps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "steps" ADD COLUMN     "identifier" TEXT NOT NULL,
ALTER COLUMN "next_step_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "steps_workflow_id_identifier_idx" ON "steps"("workflow_id", "identifier");

-- CreateIndex
CREATE UNIQUE INDEX "steps_workflow_id_identifier_key" ON "steps"("workflow_id", "identifier");
