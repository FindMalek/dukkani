/** An untracked variant/product is always purchasable regardless of its `stock` count. */
export function isStockAvailable(stock: number, trackStock: boolean): boolean {
  return !trackStock || stock > 0;
}

/** Quantity ceiling for a cart line: untracked lines are only capped by `cap`. */
export function effectiveMaxQuantity(
  stock: number,
  trackStock: boolean,
  cap = 99,
): number {
  return trackStock ? Math.min(stock, cap) : cap;
}
