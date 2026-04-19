import {
  parseCategory,
  parseInStock,
  parsePriceMax,
  parsePriceMin,
  parseSortBy,
} from "@dukkani/common/lib";
import type { ListProductsInput } from "@dukkani/common/schemas/product/input";
import { createLoader } from "nuqs/server";

export const productFilterParams = {
  sort: parseSortBy,
  category: parseCategory, // category ID — null means "all"
  minPrice: parsePriceMin, // null means no lower bound
  maxPrice: parsePriceMax, // null means no upper bound
  inStock: parseInStock,
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
    priceMin:
      filters.minPrice != null && filters.minPrice > 0
        ? filters.minPrice
        : undefined,
    priceMax:
      filters.maxPrice != null && filters.maxPrice > 0
        ? filters.maxPrice
        : undefined,
  };
}
