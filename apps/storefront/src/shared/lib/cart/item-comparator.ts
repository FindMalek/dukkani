/**
 * Normalize add-on lines for stable keys (sorted by option id).
 */
export function normalizeAddonSelections(
  addons?: Array<{ addonOptionId: string; quantity?: number }>,
): Array<{ addonOptionId: string; quantity: number }> {
  return (addons ?? [])
    .map((a) => ({
      addonOptionId: a.addonOptionId,
      quantity: a.quantity ?? 1,
    }))
    .sort((a, b) => a.addonOptionId.localeCompare(b.addonOptionId));
}

/**
 * Generate a unique key for a cart item (product + variant + add-on combo).
 */
export function getItemKey(item: {
  productId: string;
  variantId?: string;
  addonSelections?: Array<{ addonOptionId: string; quantity?: number }>;
}): string {
  const adds = normalizeAddonSelections(item.addonSelections)
    .map((a) => `${a.addonOptionId}:${a.quantity}`)
    .join("|");
  return `${item.productId}\0${item.variantId ?? ""}\0${adds}`;
}

/**
 * Check if two cart items are the same (product + variant + add-ons).
 */
export function areItemsEqual(
  item1: {
    productId: string;
    variantId?: string;
    addonSelections?: Array<{ addonOptionId: string; quantity?: number }>;
  },
  item2: {
    productId: string;
    variantId?: string;
    addonSelections?: Array<{ addonOptionId: string; quantity?: number }>;
  },
): boolean {
  return getItemKey(item1) === getItemKey(item2);
}
