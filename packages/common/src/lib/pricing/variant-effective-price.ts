import type { Decimal } from "@prisma/client/runtime/client";
import { decimalLikeToNumber } from "../decimal/decimal-like";

/**
 * Unit price for a variant row: explicit variant price, or inherited product-version base price.
 * Returns `null` when the coerced value is not finite (e.g. both prices nullish, or invalid numbers).
 */
export function effectiveVariantUnitPrice(
  variantPrice: Decimal | number | bigint | string | null | undefined,
  versionPrice: Decimal | number | bigint | string | null | undefined,
): number | null {
  const n =
    variantPrice != null
      ? decimalLikeToNumber(variantPrice)
      : decimalLikeToNumber(versionPrice);
  return Number.isFinite(n) ? n : null;
}

/** Per-variant effective prices; entries are `null` when that row has no finite sell price. */
export function effectiveVariantPrices(
  variants: ReadonlyArray<{
    price: Decimal | number | bigint | string | null | undefined;
  }>,
  versionPrice: Decimal | number | bigint | string | null | undefined,
): (number | null)[] {
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
  const finite = effectiveVariantPrices(variants, versionPrice).filter(
    (p): p is number => p != null,
  );
  if (finite.length === 0) {
    return null;
  }
  return {
    min: Math.min(...finite),
    max: Math.max(...finite),
  };
}
