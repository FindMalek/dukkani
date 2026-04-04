import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import type { ProductIncludeOutput } from "@dukkani/common/schemas/product/output";

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
    images:
      product.images?.map((i) => ({ kind: "remote" as const, url: i.url })) ??
      [],
  };
}
