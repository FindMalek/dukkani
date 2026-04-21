import type { Decimal } from "@prisma/client/runtime/client";
import { decimalLikeToNumber } from "../decimal/decimal-like";

/**
 * Unit price for a variant row: explicit variant price, or inherited product-version base price.
 * Never returns NaN when versionPrice is valid.
 */
export function effectiveVariantUnitPrice(
  variantPrice: Decimal | number | bigint | string | null | undefined,
  versionPrice: Decimal | number | bigint | string | null | undefined,
): number {
  if (variantPrice != null) {
    return decimalLikeToNumber(variantPrice);
  }
  return decimalLikeToNumber(versionPrice);
}

/** Effective sell prices for all variants (empty array if none). */
export function effectiveVariantPrices(
  variants: ReadonlyArray<{
    price: Decimal | number | bigint | string | null | undefined;
  }>,
  versionPrice: Decimal | number | bigint | string | null | undefined,
): number[] {
  return variants.map((v) => effectiveVariantUnitPrice(v.price, versionPrice));
}

/**
 * Min/max effective variant prices, or null when there are no variants (use simple version price).
 */
export function variantPriceRangeMinMax(
  variants: ReadonlyArray<{
    price: Decimal | number | bigint | string | null | undefined;
  }>,
  versionPrice: Decimal | number | bigint | string | null | undefined,
): { min: number; max: number } | null {
  if (variants.length === 0) {
    return null;
  }
  const prices = effectiveVariantPrices(variants, versionPrice);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
