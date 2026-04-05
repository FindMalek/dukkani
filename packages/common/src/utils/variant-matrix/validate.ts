import type { ProductVariantOptionFormRow } from "../../schemas/product/base";
import { cartesianSelections, MAX_VARIANT_COMBINATIONS } from "./cartesian";
import { selectionKey } from "./keys";

export type MatrixValidationErrorCode =
  | "VARIANTS_WITHOUT_OPTIONS"
  | "TOO_MANY_COMBINATIONS"
  | "COUNT_MISMATCH"
  | "SELECTION_KEY_COUNT"
  | "UNKNOWN_OPTION"
  | "INVALID_VALUE"
  | "INVALID_COMBINATION"
  | "DUPLICATE_SELECTION";

export type MatrixValidationResult =
  | { ok: true }
  | { ok: false; code: MatrixValidationErrorCode; message: string };

export function validateVariantMatrixAgainstOptions(
  variantOptions: ReadonlyArray<ProductVariantOptionFormRow>,
  variants: ReadonlyArray<{ selections: Record<string, string> }>,
): MatrixValidationResult {
  if (variantOptions.length === 0) {
    return variants.length > 0
      ? {
          ok: false,
          code: "VARIANTS_WITHOUT_OPTIONS",
          message: "Variant rows must be empty when there are no options",
        }
      : { ok: true };
  }

  const expected = cartesianSelections([...variantOptions]);
  if (expected.length > MAX_VARIANT_COMBINATIONS) {
    return {
      ok: false,
      code: "TOO_MANY_COMBINATIONS",
      message: `Too many variant combinations (max ${MAX_VARIANT_COMBINATIONS})`,
    };
  }

  if (variants.length !== expected.length) {
    return {
      ok: false,
      code: "COUNT_MISMATCH",
      message: `Expected ${expected.length} variant row(s) for the current options, got ${variants.length}`,
    };
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
      return {
        ok: false,
        code: "SELECTION_KEY_COUNT",
        message: "Each variant must select exactly one value per option",
      };
    }
    for (const k of keys) {
      if (!optionNames.has(k)) {
        return {
          ok: false,
          code: "UNKNOWN_OPTION",
          message: `Unknown option name in variant: ${k}`,
        };
      }
      const allowed = allowedByOption.get(k);
      const val = row.selections[k] ?? "";
      if (!allowed?.has(val)) {
        return {
          ok: false,
          code: "INVALID_VALUE",
          message: `Invalid value for option "${k}": ${val}`,
        };
      }
    }
    const k = selectionKey(row.selections);
    if (!expectedKeys.has(k)) {
      return {
        ok: false,
        code: "INVALID_COMBINATION",
        message: "Variant selection does not match any valid combination",
      };
    }
    if (seen.has(k)) {
      return {
        ok: false,
        code: "DUPLICATE_SELECTION",
        message: "Duplicate variant selection",
      };
    }
    seen.add(k);
  }

  return { ok: true };
}
