/*
  Warnings:

  - You are about to drop the column `address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_phone` on the `orders` table. All the data in the column will be lost.
  - Made the column `customer_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "prefers_whatsapp" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "address",
DROP COLUMN "customer_name",
DROP COLUMN "customer_phone",
ADD COLUMN     "address_id" TEXT,
ADD COLUMN     "is_whatsapp" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "customer_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "shipping_cost" DECIMAL(10,2) NOT NULL DEFAULT 12.0;

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
