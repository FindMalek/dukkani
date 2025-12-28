-- CreateEnum
CREATE TYPE "StoreNotificationMethod" AS ENUM ('EMAIL', 'TELEGRAM', 'BOTH');

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "notificationmethod" "StoreNotificationMethod" DEFAULT 'EMAIL';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onboardingstep" TEXT NOT NULL DEFAULT 'STORE_SETUP';
