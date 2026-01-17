/**
 * Safely formats a price value to 2 decimal places
 * Handles null, undefined, and NaN values by defaulting to 0
 * 
 * @param price - The price value (can be null, undefined, or number)
 * @param fallback - Optional fallback value (defaults to 0)
 * @returns Formatted price string with 2 decimal places
 * 
 * @example
 * formatPrice(10.5) // "10.50"
 * formatPrice(null) // "0.00"
 * formatPrice(undefined, 5) // "5.00"
 */
export function formatPrice(
	price: number | null | undefined,
	fallback = 0,
): string {
	const safePrice = price ?? fallback;
	return Number.isFinite(safePrice) ? safePrice.toFixed(2) : fallback.toFixed(2);
}