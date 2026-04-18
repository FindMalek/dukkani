import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import type { ProductIncludeOutput } from "@dukkani/common/schemas/product/output";
import type { FormVariantRow } from "@dukkani/common/utils";
import { reconcileVariants } from "@dukkani/common/utils";

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
    });
  });

  if (product.hasVariants && fromApi.length === 0 && opts.length > 0) {
    return reconcileVariants([], opts, {
      price: product.price,
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
    images:
      product.images?.map((i) => ({ kind: "remote" as const, url: i.url })) ??
      [],
  };
}
