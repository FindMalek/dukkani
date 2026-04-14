import type {
  ProductFormInput,
  ProductFormOutput,
} from "@dukkani/common/schemas/product/form";
import type { ProductIncludeOutput } from "@dukkani/common/schemas/product/output";
import type { VariantInput } from "@dukkani/common/schemas/variant/input";
import type { FormVariantRow } from "@dukkani/common/utils";
import {
  formVariantRowsToInput,
  reconcileVariants,
} from "@dukkani/common/utils";

type VariantFormRowLike =
  | ProductFormInput["variants"][number]
  | ProductFormOutput["variants"][number];

function coerceOptionalNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function coerceStock(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.trunc(value));
  }
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0;
  }
  return 0;
}

/** Normalize Zod input/output variant rows to `FormVariantRow` for matrix helpers. */
export function toFormVariantRows(
  variants: readonly VariantFormRowLike[],
): FormVariantRow[] {
  return variants.map((v) => ({
    selections: v.selections,
    sku: v.sku,
    price: coerceOptionalNumber(v.price),
    stock: coerceStock(v.stock),
    imageRef: v.imageRef,
  }));
}

function variantRowToFormInput(
  row: FormVariantRow,
): ProductFormInput["variants"][number] {
  return {
    selections: row.selections,
    sku: row.sku,
    price:
      row.price !== undefined && row.price !== null
        ? String(row.price)
        : undefined,
    stock: String(row.stock),
    imageRef: row.imageRef,
  };
}

function mapVariantsFromProduct(
  product: ProductIncludeOutput,
): ProductFormInput["variants"] {
  const opts = (product.variantOptions ?? []).map((o) => ({
    name: o.name,
    values: o.values.map((v) => ({ value: v.value })),
  }));

  const fromApi = (product.variants ?? []).map((v) => {
    const selections: Record<string, string> = {};
    for (const s of v.selections) {
      selections[s.option.name] = s.value.value;
    }
    return variantRowToFormInput({
      selections,
      sku: v.sku ?? undefined,
      price: v.price ?? undefined,
      stock: v.stock,
      imageRef: v.imageUrl ?? undefined,
    });
  });

  if (product.hasVariants && fromApi.length === 0 && opts.length > 0) {
    return reconcileVariants([], opts, {
      stock: product.stock,
    }).map(variantRowToFormInput);
  }

  return fromApi;
}

export function mapProductToFormValues(
  product: ProductIncludeOutput,
): ProductFormInput {
  return {
    name: product.name,
    description: product.description ?? "",
    price: String(product.price),
    stock: String(product.stock),
    published: product.published,
    categoryId: product.categoryId ?? "",
    hasVariants: product.hasVariants,
    variantOptions: (product.variantOptions ?? []).map((o) => ({
      name: o.name,
      values: o.values.map((v) => ({ value: v.value })),
    })),
    variants: mapVariantsFromProduct(product),
    addonGroups: [],
    images:
      product.images?.map((i) => ({ kind: "remote" as const, url: i.url })) ??
      [],
  };
}

/**
 * Resolve form variant rows to VariantInput array, mapping each variant's imageRef
 * (either a remote URL or local file clientId) to the final uploaded URL.
 */
export function resolveVariantImageUrls(
  variants: readonly VariantFormRowLike[],
  images: ProductFormInput["images"],
  finalUrls: (string | undefined)[],
): VariantInput[] {
  const rows = toFormVariantRows(variants);
  return formVariantRowsToInput(rows).map((v, i) => ({
    ...v,
    imageUrl: (() => {
      const imageRef = rows[i]?.imageRef;
      if (!imageRef) return undefined;
      const idx = images.findIndex((img) =>
        img.kind === "remote"
          ? img.url === imageRef
          : img.clientId === imageRef,
      );
      return idx >= 0 ? finalUrls[idx] : undefined;
    })(),
  }));
}
