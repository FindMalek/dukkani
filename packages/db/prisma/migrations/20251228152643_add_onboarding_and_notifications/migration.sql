-- CreateEnum
CREATE TYPE "StoreNotificationMethod" AS ENUM ('EMAIL', 'TELEGRAM', 'BOTH');

-- CreateEnum
CREATE TYPE "UserOnboardingStep" AS ENUM ('STORE_SETUP', 'STORE_CREATED', 'STORE_CONFIGURED', 'STORE_LAUNCHED');

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "notificationmethod" "StoreNotificationMethod" DEFAULT 'EMAIL';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onboardingStep" "UserOnboardingStep" NOT NULL DEFAULT 'STORE_SETUP';
