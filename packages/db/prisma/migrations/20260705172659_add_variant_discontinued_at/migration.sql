-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "discontinued_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "product_variants_product_version_id_discontinued_at_idx" ON "product_variants"("product_version_id", "discontinued_at");
