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
 */
export function reconcileVariants(
  previous: FormVariantRow[],
  options: ProductVariantOptionFormRow[],
  defaults: { price: number; stock: number },
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
      price: defaults.price,
      stock: defaults.stock,
    };
  });
}

/** Map validated form rows to API `VariantInput`. */
export function formVariantRowsToInput(rows: FormVariantRow[]): VariantInput[] {
  return rows.map((row) => ({
    selections: row.selections,
    sku: row.sku?.trim() ? row.sku.trim() : undefined,
    price: row.price,
    stock: row.stock,
  }));
}
