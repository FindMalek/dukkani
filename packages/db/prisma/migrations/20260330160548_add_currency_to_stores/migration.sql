-- CreateEnum
CREATE TYPE "SupportedCurrency" AS ENUM ('TND', 'USD', 'EUR', 'GBP', 'DZD', 'LYD');

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "currency" "SupportedCurrency" NOT NULL DEFAULT 'TND';
