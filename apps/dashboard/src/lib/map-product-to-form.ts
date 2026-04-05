import type { ProductAddonGroupInput } from "@dukkani/common/schemas/product-addon/input";
import type {
  ProductFormInput,
  ProductFormOutput,
} from "@dukkani/common/schemas/product/form";
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
      stock: product.stock,
    }).map(variantRowToFormInput);
  }

  return fromApi;
}

export function mapFormAddonGroupsToInput(
  groups: ProductFormOutput["addonGroups"],
): ProductAddonGroupInput[] {
  return groups.map((g, gi) => ({
    name: g.name,
    sortOrder: g.sortOrder ?? gi,
    selectionType: g.selectionType,
    required: g.required,
    options: g.options.map((o, oi) => ({
      name: o.name,
      sortOrder: o.sortOrder ?? oi,
      priceDelta: o.priceDelta,
      stock: o.stock,
    })),
  }));
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
    addonGroups: (product.addonGroups ?? []).map((g) => ({
      name: g.name,
      sortOrder: String(g.sortOrder),
      selectionType: g.selectionType,
      required: g.required,
      options: g.options.map((o) => ({
        name: o.name,
        sortOrder: String(o.sortOrder),
        priceDelta: String(o.priceDelta),
        stock: String(o.stock),
      })),
    })),
    images:
      product.images?.map((i) => ({ kind: "remote" as const, url: i.url })) ??
      [],
  };
}
