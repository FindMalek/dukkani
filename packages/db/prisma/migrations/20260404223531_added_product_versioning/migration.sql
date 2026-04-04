/*
  Warnings:

  - You are about to drop the column `product_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `variant_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `product_variant_options` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `has_variants` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_version_id,name]` on the table `product_variant_options` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_version_id,sku]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_version_id` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_version_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_version_id` to the `product_variant_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_version_id` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductVersionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_variant_id_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_options" DROP CONSTRAINT "product_variant_options_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_product_id_fkey";

-- DropIndex
DROP INDEX "product_variant_options_product_id_idx";

-- DropIndex
DROP INDEX "product_variant_options_product_id_name_key";

-- DropIndex
DROP INDEX "product_variants_product_id_idx";

-- DropIndex
DROP INDEX "product_variants_product_id_sku_key";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "product_id",
ADD COLUMN     "product_version_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "productVariantId",
ADD COLUMN     "product_variant_id" TEXT,
ADD COLUMN     "product_version_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "variant_id";

-- AlterTable
ALTER TABLE "product_variant_options" DROP COLUMN "product_id",
ADD COLUMN     "product_version_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "product_id",
ADD COLUMN     "product_version_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "description",
DROP COLUMN "has_variants",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "stock",
ADD COLUMN     "current_published_version_id" TEXT,
ADD COLUMN     "draft_version_id" TEXT;

-- CreateTable
CREATE TABLE "order_item_variant_attributes" (
    "id" TEXT NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "option_name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_variant_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_versions" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "status" "ProductVersionStatus" NOT NULL,
    "version_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "has_variants" BOOLEAN NOT NULL DEFAULT false,
    "created_from_version_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_item_variant_attributes_order_item_id_idx" ON "order_item_variant_attributes"("order_item_id");

-- CreateIndex
CREATE INDEX "product_versions_product_id_idx" ON "product_versions"("product_id");

-- CreateIndex
CREATE INDEX "product_versions_product_id_status_idx" ON "product_versions"("product_id", "status");

-- CreateIndex
CREATE INDEX "product_versions_product_id_version_number_idx" ON "product_versions"("product_id", "version_number");

-- CreateIndex
CREATE INDEX "images_product_version_id_idx" ON "images"("product_version_id");

-- CreateIndex
CREATE INDEX "order_items_product_version_id_idx" ON "order_items"("product_version_id");

-- CreateIndex
CREATE INDEX "product_variant_options_product_version_id_idx" ON "product_variant_options"("product_version_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_options_product_version_id_name_key" ON "product_variant_options"("product_version_id", "name");

-- CreateIndex
CREATE INDEX "product_variants_product_version_id_idx" ON "product_variants"("product_version_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_product_version_id_sku_key" ON "product_variants"("product_version_id", "sku");

-- CreateIndex
CREATE INDEX "products_current_published_version_id_idx" ON "products"("current_published_version_id");

-- CreateIndex
CREATE INDEX "products_draft_version_id_idx" ON "products"("draft_version_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_variant_attributes" ADD CONSTRAINT "order_item_variant_attributes_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_current_published_version_id_fkey" FOREIGN KEY ("current_published_version_id") REFERENCES "product_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_draft_version_id_fkey" FOREIGN KEY ("draft_version_id") REFERENCES "product_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_versions" ADD CONSTRAINT "product_versions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_versions" ADD CONSTRAINT "product_versions_created_from_version_id_fkey" FOREIGN KEY ("created_from_version_id") REFERENCES "product_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_options" ADD CONSTRAINT "product_variant_options_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
