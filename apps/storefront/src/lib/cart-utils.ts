/**
 * Generate a unique key for a cart item
 * Used for identifying items consistently across the app
 */
export function getItemKey(item: {
	productId: string;
	variantId?: string;
}): string {
	return item.variantId
		? `${item.productId}-${item.variantId}`
		: item.productId;
}

/**
 * Get cart key for a store slug
 */
export function getCartKey(storeSlug: string | null): string {
	return storeSlug || "default";
}

/**
 * Check if two cart items are the same (same product + variant)
 */
export function areItemsEqual(
	item1: { productId: string; variantId?: string },
	item2: { productId: string; variantId?: string },
): boolean {
	return getItemKey(item1) === getItemKey(item2);
}
