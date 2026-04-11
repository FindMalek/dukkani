import type { ListProductsInput } from "@dukkani/common/schemas/product/input";
import {
  parsePriceMax,
  parsePriceMin,
  parseSortBy,
} from "@dukkani/common/utils/query-parsers";
import { createLoader, parseAsBoolean, parseAsString } from "nuqs/server";

export const productFilterParams = {
  sort: parseSortBy,
  category: parseAsString, // category ID — null means "all"
  minPrice: parsePriceMin, // null means no lower bound
  maxPrice: parsePriceMax, // null means no upper bound
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
