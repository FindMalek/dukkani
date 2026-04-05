import type { ProductVariantOptionFormRow } from "../../schemas/product/base";

/**
 * Stable key for a selection map (order-independent). Used for deduping rows.
 */
export function selectionKey(selections: Record<string, string>): string {
  return Object.keys(selections)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}:${selections[k]}`)
    .join("|");
}

/**
 * Deterministic fingerprint of variant option *structure* (trimmed names + value
 * strings only). Options sorted by trimmed name; values per option sorted
 * lexicographically. For stable React effect deps when array identity churns.
 */
export function variantOptionsStructureFingerprint(
  options: ReadonlyArray<ProductVariantOptionFormRow>,
): string {
  const sorted = [...options].sort((a, b) =>
    a.name.trim().localeCompare(b.name.trim()),
  );
  return sorted
    .map((o) => {
      const vals = [...o.values]
        .map((v) => v.value.trim())
        .sort((x, y) => x.localeCompare(y));
      return `${o.name.trim()}\u001f${vals.join("\u001e")}`;
    })
    .join("\u001d");
}
