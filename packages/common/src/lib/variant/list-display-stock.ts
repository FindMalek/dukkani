/**
 * Row slice needed to compute a single "list stock" number for product grids.
 * Compatible with {@link ProductVersionListSliceDbData} from the product-version query.
 */
export type ListVersionStockSlice = {
  hasVariants: boolean;
  stock: number;
  variants?: ReadonlyArray<{ stock: number }> | null;
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
