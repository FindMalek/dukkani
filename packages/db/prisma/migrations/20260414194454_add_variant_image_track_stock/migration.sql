-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "image_id" TEXT,
ADD COLUMN     "track_stock" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "product_variants_image_id_idx" ON "product_variants"("image_id");

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
