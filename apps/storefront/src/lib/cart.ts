/**
 * Caps quantity to a valid range: at least 1, at most min(stock, 99).
 * Use in UI before calling addItem or updateQuantity; the cart store does not cap.
 */
export function capQuantity(quantity: number, stock: number): number {
	return Math.min(Math.max(1, quantity), Math.min(stock, 99));
}

// TODO: i dont think this is even necessary we need to remove it's use (like i dont think this check is needed at all)
