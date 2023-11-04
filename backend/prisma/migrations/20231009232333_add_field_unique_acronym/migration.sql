/*
  Warnings:

  - A unique constraint covering the columns `[acronym]` on the table `institutes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "institutes_acronym_key" ON "institutes"("acronym");
