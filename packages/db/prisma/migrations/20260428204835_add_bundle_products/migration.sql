-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SIMPLE', 'BUNDLE');

-- AlterTable
ALTER TABLE "product_versions" ADD COLUMN     "is_bundle" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'SIMPLE';

-- CreateTable
CREATE TABLE "order_item_bundle_children" (
    "id" TEXT NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "child_product_id" TEXT NOT NULL,
    "child_variant_id" TEXT,
    "child_product_version_id" TEXT NOT NULL,
    "item_qty" INTEGER NOT NULL,
    "total_qty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_bundle_children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bundle_items" (
    "id" TEXT NOT NULL,
    "item_qty" INTEGER NOT NULL DEFAULT 1,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "bundle_version_id" TEXT NOT NULL,
    "child_product_id" TEXT NOT NULL,
    "child_variant_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bundle_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_item_bundle_children_order_item_id_idx" ON "order_item_bundle_children"("order_item_id");

-- CreateIndex
CREATE INDEX "order_item_bundle_children_child_product_id_idx" ON "order_item_bundle_children"("child_product_id");

-- CreateIndex
CREATE INDEX "bundle_items_bundle_version_id_idx" ON "bundle_items"("bundle_version_id");

-- CreateIndex
CREATE INDEX "bundle_items_child_product_id_idx" ON "bundle_items"("child_product_id");

-- CreateIndex
CREATE INDEX "bundle_items_child_variant_id_idx" ON "bundle_items"("child_variant_id");

-- CreateIndex
CREATE INDEX "products_store_id_type_idx" ON "products"("store_id", "type");

-- AddForeignKey
ALTER TABLE "order_item_bundle_children" ADD CONSTRAINT "order_item_bundle_children_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_bundle_children" ADD CONSTRAINT "order_item_bundle_children_child_product_id_fkey" FOREIGN KEY ("child_product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_bundle_children" ADD CONSTRAINT "order_item_bundle_children_child_variant_id_fkey" FOREIGN KEY ("child_variant_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_bundle_children" ADD CONSTRAINT "order_item_bundle_children_child_product_version_id_fkey" FOREIGN KEY ("child_product_version_id") REFERENCES "product_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bundle_items" ADD CONSTRAINT "bundle_items_bundle_version_id_fkey" FOREIGN KEY ("bundle_version_id") REFERENCES "product_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bundle_items" ADD CONSTRAINT "bundle_items_child_product_id_fkey" FOREIGN KEY ("child_product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bundle_items" ADD CONSTRAINT "bundle_items_child_variant_id_fkey" FOREIGN KEY ("child_variant_id") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
