import type { ProductVariantOptionFormRow } from "../../schemas/product/base";
import type { VariantInput } from "../../schemas/variant/input";
import { cartesianSelections } from "./cartesian";
import { selectionKey } from "./keys";

export type FormVariantRow = {
  selections: Record<string, string>;
  sku?: string;
  price?: number;
  stock: number;
};

/**
 * Merge a new option grid with prior rows: reuse SKU/price/stock when the selection tuple still exists.
 * New rows use **inherit** pricing (`price: undefined`); the published version base price applies until the merchant sets an override.
 */
export function reconcileVariants(
  previous: FormVariantRow[],
  options: ProductVariantOptionFormRow[],
  defaults: { stock: number },
): FormVariantRow[] {
  const target = cartesianSelections(options);
  const prevByKey = new Map(
    previous.map((row) => [selectionKey(row.selections), row]),
  );

  return target.map((selections) => {
    const key = selectionKey(selections);
    const prev = prevByKey.get(key);
    if (prev) {
      return {
        ...prev,
        selections,
      };
    }
    return {
      selections,
      sku: undefined,
      price: undefined,
      stock: defaults.stock,
    };
  });
}

/** Map validated form rows to API `VariantInput` (omit `price` when inheriting version base). */
export function formVariantRowsToInput(rows: FormVariantRow[]): VariantInput[] {
  return rows.map((row) => ({
    selections: row.selections,
    sku: row.sku?.trim() ? row.sku.trim() : undefined,
    ...(row.price !== undefined && row.price !== null
      ? { price: row.price }
      : {}),
    stock: row.stock,
  }));
}
