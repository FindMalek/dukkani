import type {
  ProductFormInput,
  ProductFormOutput,
  ProductImageAttachment,
} from "@dukkani/common/schemas/product/form";
import type { ProductVariantFormRowInput } from "@dukkani/common/schemas/variant/form";
import type { VariantInput } from "@dukkani/common/schemas/variant/input";
import type { FormVariantRow } from "@dukkani/common/utils";
import {
  formVariantRowsToInput,
  reconcileVariants,
} from "@dukkani/common/utils";

type VariantFormRowLike =
  | ProductVariantFormRowInput
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

export function productImageAttachmentThumb(
  img: ProductImageAttachment,
  previewById: Record<string, string>,
): { ref: string; src: string | undefined; alt: string } {
  if (img.kind === "remote") {
    return { ref: img.url, src: img.url, alt: "" };
  }
  return {
    ref: img.clientId,
    src: previewById[img.clientId],
    alt: img.file.name,
  };
}

export function resolveVariantMatrixThumbSrc(
  imageRef: string | undefined,
  images: ProductFormInput["images"],
  previewById: Record<string, string>,
): string | undefined {
  if (!imageRef) return undefined;
  const img = images.find((i) =>
    i.kind === "remote" ? i.url === imageRef : i.clientId === imageRef,
  );
  if (!img) return undefined;
  return img.kind === "remote" ? img.url : previewById[img.clientId];
}

export function toFormRow(
  row: ReturnType<typeof reconcileVariants>[number],
): ProductVariantFormRowInput {
  return {
    selections: row.selections,
    sku: row.sku,
    price: row.price !== undefined ? String(row.price) : undefined,
    stock: String(row.stock),
    imageRef: row.imageRef,
  };
}

export function coerceVariantRows(
  rows: ProductVariantFormRowInput[],
): Parameters<typeof reconcileVariants>[0] {
  return rows.map((r) => ({
    selections: r.selections,
    sku: r.sku,
    price: (() => {
      const p = r.price;
      if (p === undefined || p === null || p === "") return undefined;
      const n = Number(p);
      return Number.isFinite(n) && n > 0 ? n : undefined;
    })(),
    stock: (() => {
      const n = Number.parseInt(String(r.stock), 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    })(),
    imageRef: r.imageRef,
  }));
}

/** Only reconcile against option values that are non-empty (avoid ghost combinations). */
export function sanitizeOptsForReconcile(
  opts: ProductFormInput["variantOptions"],
): ProductFormInput["variantOptions"] {
  return opts
    .filter((o) => o.name.trim() && o.values.some((v) => v.value.trim()))
    .map((o) => ({
      name: o.name.trim(),
      values: o.values
        .filter((v) => v.value.trim())
        .map((v) => ({ value: v.value.trim() })),
    }));
}

export function getVariantLabel(selections: Record<string, string>): string {
  return Object.values(selections).join(" / ") || "—";
}
