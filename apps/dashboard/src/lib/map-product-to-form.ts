import type { ProductIncludeOutput } from "@dukkani/common/schemas/product/output";
import type { ProductFormInput } from "@dukkani/common/schemas/product/form";

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
    imageFiles: [],
    existingImageUrls: product.images?.map((i) => i.url) ?? [],
  };
}
