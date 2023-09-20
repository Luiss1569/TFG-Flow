/*
  Warnings:

  - You are about to drop the column `institute_id` on the `teachers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_institute_id_fkey";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "institute_id";
