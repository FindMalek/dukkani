-- AlterTable
ALTER TABLE "product_versions" ADD COLUMN     "variant_effective_price_max" DECIMAL(10,2),
ADD COLUMN     "variant_effective_price_min" DECIMAL(10,2);
