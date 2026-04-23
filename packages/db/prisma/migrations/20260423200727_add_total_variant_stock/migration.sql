-- AlterTable
ALTER TABLE "product_versions" ADD COLUMN     "total_variant_stock" INTEGER NOT NULL DEFAULT 0;

-- Backfill: simple products use version stock; variant products use sum of SKU stocks.
UPDATE "product_versions" pv
SET "total_variant_stock" = "stock"
WHERE "has_variants" = false;

UPDATE "product_versions" pv
SET "total_variant_stock" = COALESCE((
  SELECT SUM(v.stock) FROM "product_variants" v WHERE v.product_version_id = pv.id
), 0)
WHERE "has_variants" = true;
