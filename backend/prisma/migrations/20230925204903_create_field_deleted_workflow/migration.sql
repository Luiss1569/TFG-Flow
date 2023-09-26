-- AlterEnum
ALTER TYPE "user_roles" ADD VALUE 'coordinator';

-- AlterTable
ALTER TABLE "workflows" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deleted_at" TIMESTAMP(3);
