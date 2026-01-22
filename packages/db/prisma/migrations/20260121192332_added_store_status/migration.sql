-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SUSPENDED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "status" "StoreStatus" NOT NULL DEFAULT 'DRAFT';
