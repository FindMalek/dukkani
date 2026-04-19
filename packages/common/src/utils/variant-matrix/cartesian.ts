import type { ProductVariantOptionFormRow } from "../../schemas/product/base";

/** Hard cap for variant combinations (form + API). 100 matches Shopify's limit and is sufficient for SMBs. */
export const MAX_VARIANT_COMBINATIONS = 100;

/** Alias for clarity in new code. */
export const VARIANT_COMBINATIONS_LIMIT = MAX_VARIANT_COMBINATIONS;

/**
 * Cartesian product of option values; keys are option **names** (matches `writeVariantMatrix`).
 */
export function cartesianSelections(
  options: ProductVariantOptionFormRow[],
): Record<string, string>[] {
  if (options.length === 0) return [];

  const names = options.map((o) => o.name.trim());
  const valueLists = options.map((o) => o.values.map((v) => v.value.trim()));

  function build(
    i: number,
    acc: Record<string, string>,
  ): Record<string, string>[] {
    if (i >= options.length) return [acc];
    const name = names[i];
    const vals = valueLists[i] ?? [];
    if (!name) return [];
    const out: Record<string, string>[] = [];
    for (const val of vals) {
      out.push(...build(i + 1, { ...acc, [name]: val }));
    }
    return out;
  }

  return build(0, {});
}

/** Count valid combinations (non-empty trimmed values per option). */
export function countVariantCombinations(
  options: ReadonlyArray<ProductVariantOptionFormRow>,
): number {
  if (options.length === 0) return 0;
  let n = 1;
  for (const o of options) {
    const len = o.values.filter((v) => v.value.trim().length > 0).length;
    if (len === 0) return 0;
    n *= len;
  }
  return n;
}
