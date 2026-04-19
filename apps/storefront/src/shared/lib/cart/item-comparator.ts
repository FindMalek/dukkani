/**
 * Stable key for a cart line (product + variant).
 */
export function getItemKey(item: {
  productId: string;
  variantId?: string;
}): string {
  return `${item.productId}\0${item.variantId ?? ""}`;
}

/**
 * Whether two cart lines refer to the same product + variant row.
 */
export function areItemsEqual(
  item1: { productId: string; variantId?: string },
  item2: { productId: string; variantId?: string },
): boolean {
  return getItemKey(item1) === getItemKey(item2);
}
