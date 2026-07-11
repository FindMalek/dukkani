/**
 * Row slice needed to compute a single "list stock" number for product grids.
 * Compatible with {@link ProductVersionListSliceDbData} from the product-version query.
 */
export type ListVersionStockSlice = {
  hasVariants: boolean;
  stock: number;
  variants?: ReadonlyArray<{ stock: number; trackStock?: boolean }> | null;
};

/**
 * For variant products, version `stock` is 0; total units for list UIs are the sum
 * of variant `stock` rows. Simple products use version `stock` only.
 */
export function listDisplayStock(v: ListVersionStockSlice | null): number {
  if (!v) {
    return 0;
  }
  if (!v.hasVariants) {
    return v.stock;
  }
  const rows = v.variants;
  if (!rows?.length) {
    return v.stock;
  }
  return rows.reduce((sum, row) => sum + row.stock, 0);
}

/**
 * A product is out of stock only if every unit that could sell it is both
 * stock-tracked and at zero — an untracked variant is always purchasable.
 */
export function isListOutOfStock(v: ListVersionStockSlice | null): boolean {
  if (!v) {
    return true;
  }
  if (!v.hasVariants) {
    return v.stock === 0;
  }
  const rows = v.variants;
  if (!rows?.length) {
    return v.stock === 0;
  }
  return rows.every((row) => row.trackStock !== false && row.stock === 0);
}
