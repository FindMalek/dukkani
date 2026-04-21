import type { Decimal } from "@prisma/client/runtime/client";
import type { ProductPriceDisplay } from "../../schemas/product/output";
import { variantPriceRangeMinMax } from "./variant-effective-price";

/**
 * Build list/PDP `priceDisplay` from version row. Uses denormalized bounds when available,
 * otherwise computes range from full variant rows (e.g. detail API).
 */
export function buildProductPriceDisplay(input: {
  hasVariants: boolean;
  versionPrice: number;
  variantEffectivePriceMin?: number | null;
  variantEffectivePriceMax?: number | null;
  variantsFallback?: ReadonlyArray<{
    price: Decimal | number | bigint | string | null | undefined;
  }>;
}): ProductPriceDisplay {
  const {
    hasVariants,
    versionPrice,
    variantEffectivePriceMin,
    variantEffectivePriceMax,
    variantsFallback,
  } = input;

  if (hasVariants) {
    if (variantEffectivePriceMin != null && variantEffectivePriceMax != null) {
      return {
        kind: "range",
        min: variantEffectivePriceMin,
        max: variantEffectivePriceMax,
      };
    }
    const range = variantPriceRangeMinMax(variantsFallback ?? [], versionPrice);
    if (range) {
      return { kind: "range", min: range.min, max: range.max };
    }
  }
  return { kind: "simple", price: versionPrice };
}
