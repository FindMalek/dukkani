import type { ListProductsInput } from "@dukkani/common/schemas/product/input";
import {
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import { createLoader } from "nuqs/server";

export const SORT_OPTIONS = ["priceAsc", "priceDesc", "newest"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const productFilterParams = {
  sort: parseAsStringLiteral(SORT_OPTIONS).withDefault("newest"),
  category: parseAsString, // category ID — null means "all"
  minPrice: parseAsFloat, // null means no lower bound
  maxPrice: parseAsFloat, // null means no upper bound
  inStock: parseAsBoolean.withDefault(false),
};

export const loadProductFilters = createLoader(productFilterParams);

export type ProductFilters = Awaited<ReturnType<typeof loadProductFilters>>;

export function buildProductFiltersInput(
  filters: ProductFilters,
): Pick<
  ListProductsInput,
  "categoryId" | "stockFilter" | "sortBy" | "priceMin" | "priceMax"
> {
  return {
    categoryId: filters.category ?? undefined,
    stockFilter: filters.inStock ? "in-stock" : undefined,
    sortBy: filters.sort,
    priceMin: filters.minPrice ?? undefined,
    priceMax: filters.maxPrice ?? undefined,
  };
}
