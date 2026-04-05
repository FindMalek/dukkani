import type { VariantInput } from "../schemas/variant/input";

/** Hard cap for variant combinations (form + API). */
export const MAX_VARIANT_COMBINATIONS = 200;

export type VariantOptionLike = {
  name: string;
  values: { value: string }[];
};

/** Stable key for a selection map (order-independent). */
export function selectionKey(selections: Record<string, string>): string {
  return Object.keys(selections)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}:${selections[k]}`)
    .join("|");
}

/**
 * Cartesian product of option values; keys are option **names** (matches `writeVariantMatrix`).
 */
export function cartesianSelections(
  options: VariantOptionLike[],
): Record<string, string>[] {
  if (options.length === 0) return [];

  const names = options.map((o) => o.name.trim());
  const valueLists = options.map((o) => o.values.map((v) => v.value.trim()));

  function build(
    i: number,
    acc: Record<string, string>,
  ): Record<string, string>[] {
    if (i >= options.length) return [acc];
    const name = names[i];
    const vals = valueLists[i] ?? [];
    if (!name) return [];
    const out: Record<string, string>[] = [];
    for (const val of vals) {
      out.push(...build(i + 1, { ...acc, [name]: val }));
    }
    return out;
  }

  return build(0, {});
}

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
  options: VariantOptionLike[],
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

/** Type guard: options are valid for cartesian (non-empty names and values). */
export function countVariantCombinations(options: VariantOptionLike[]): number {
  if (options.length === 0) return 0;
  let n = 1;
  for (const o of options) {
    const len = o.values.filter((v) => v.value.trim().length > 0).length;
    if (len === 0) return 0;
    n *= len;
  }
  return n;
}

export function validateVariantMatrixAgainstOptions(
  variantOptions: VariantOptionLike[],
  variants: { selections: Record<string, string> }[],
): string | null {
  if (variantOptions.length === 0) {
    return variants.length > 0
      ? "Variant rows must be empty when there are no options"
      : null;
  }

  const expected = cartesianSelections(variantOptions);
  if (expected.length > MAX_VARIANT_COMBINATIONS) {
    return `Too many variant combinations (max ${MAX_VARIANT_COMBINATIONS})`;
  }

  if (variants.length !== expected.length) {
    return `Expected ${expected.length} variant row(s) for the current options, got ${variants.length}`;
  }

  const expectedKeys = new Set(expected.map((s) => selectionKey(s)));
  const seen = new Set<string>();

  const optionNames = new Set(variantOptions.map((o) => o.name.trim()));
  const allowedByOption = new Map(
    variantOptions.map((o) => [
      o.name.trim(),
      new Set(o.values.map((v) => v.value.trim())),
    ]),
  );

  for (const row of variants) {
    const keys = Object.keys(row.selections);
    if (keys.length !== optionNames.size) {
      return "Each variant must select exactly one value per option";
    }
    for (const k of keys) {
      if (!optionNames.has(k)) {
        return `Unknown option name in variant: ${k}`;
      }
      const allowed = allowedByOption.get(k);
      const val = row.selections[k] ?? "";
      if (!allowed?.has(val)) {
        return `Invalid value for option "${k}": ${val}`;
      }
    }
    const k = selectionKey(row.selections);
    if (!expectedKeys.has(k)) {
      return "Variant selection does not match any valid combination";
    }
    if (seen.has(k)) {
      return "Duplicate variant selection";
    }
    seen.add(k);
  }

  return null;
}
