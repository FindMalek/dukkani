import type {
  ProductFormInput,
  ProductImageAttachment,
} from "@dukkani/common/schemas/product/form";
import { reconcileVariants } from "@dukkani/common/utils";

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
): ProductFormInput["variants"][number] {
  return {
    selections: row.selections,
    sku: row.sku,
    price: row.price !== undefined ? String(row.price) : undefined,
    stock: String(row.stock),
    imageRef: row.imageRef,
  };
}

export function coerceVariantRows(
  rows: ProductFormInput["variants"],
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
