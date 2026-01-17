/*
  Warnings:

  - A unique constraint covering the columns `[product_id,sku]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_variants_product_id_sku_key" ON "product_variants"("product_id", "sku");
