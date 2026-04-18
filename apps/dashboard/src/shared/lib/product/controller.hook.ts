import type {
  ListProductsInput,
  StockFilter,
  VariantsFilter,
} from "@dukkani/common/schemas/product/input";
import {
  parseLimit,
  parsePage,
  parsePriceMax,
  parsePriceMin,
  parseProductStatus,
  parseSearchQuery,
  parseStockFilter,
  parseVariantsFilter,
} from "@dukkani/common/utils/query-parsers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "../store/active.store";
import { useProductStore } from "./store";

/**
 * Controller hook that composes:
 * - Active store state (Zustand)
 * - Filter + pagination state (nuqs — URL-synced, shareable, bookmarkable)
 * - UI state — selection and view mode (Zustand)
 * - ORPC query hooks
 * - ORPC mutation hooks
 *
 * Provides a single interface for Products pages.
 */
export function useProductsController() {
  const { selectedStoreId } = useActiveStoreStore();
  const { selectedProductId, viewMode, setSelectedProductId, setViewMode } =
    useProductStore();

  // Filters and pagination live in the URL so they're shareable and
  // cleared automatically when the user navigates away.
  const [filters, setFilters] = useQueryStates({
    search: parseSearchQuery.withDefault(""),
    published: parseProductStatus,
    stockFilter: parseStockFilter,
    variantsFilter: parseVariantsFilter,
    priceMin: parsePriceMin,
    priceMax: parsePriceMax,
    page: parsePage,
    limit: parseLimit,
    categoryId: parseSearchQuery,
  });

  const resetFilters = () =>
    setFilters({
      search: "",
      published: null,
      stockFilter: "all",
      variantsFilter: "all",
      priceMin: null,
      priceMax: null,
      page: 1,
      categoryId: null,
    });

  // Build query input — omit "all" sentinels and null values
  const queryInput = useMemo<ListProductsInput>(() => {
    const input: ListProductsInput = {
      page: filters.page,
      limit: filters.limit,
      storeId: selectedStoreId ?? undefined,
    };
    if (filters.search) input.search = filters.search;
    if (filters.categoryId) input.categoryId = filters.categoryId;
    if (filters.published !== null) input.published = filters.published;
    if (filters.stockFilter !== "all") input.stockFilter = filters.stockFilter;
    if (filters.variantsFilter !== "all")
      input.variantsFilter = filters.variantsFilter;
    if (filters.priceMin != null) input.priceMin = filters.priceMin;
    if (filters.priceMax != null) input.priceMax = filters.priceMax;
    return input;
  }, [selectedStoreId, filters]);

  const productsQuery = useQuery({
    ...appQueries.product.all({
      input: queryInput,
    }),
    enabled: Boolean(selectedStoreId),
  });

  const updateProductMutation = useMutation(appMutations.product.update());
  const deleteProductMutation = useMutation(appMutations.product.delete());
  const togglePublishMutation = useMutation(
    appMutations.product.togglePublished(),
  );

  return {
    // Store context
    selectedStoreId,
    // URL filter state
    search: filters.search,
    categoryId: filters.categoryId,
    published: filters.published,
    stockFilter: filters.stockFilter,
    variantsFilter: filters.variantsFilter,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    page: filters.page,
    limit: filters.limit,
    // Filter setters — wrapped to return void (nuqs setters return Promise internally)
    setSearch: (v: string) => {
      setFilters({ search: v, page: 1 });
    },
    setCategoryId: (v: string | null) => {
      setFilters({ categoryId: v, page: 1 });
    },
    setPublished: (v: boolean | null) => {
      setFilters({ published: v, page: 1 });
    },
    setStockFilter: (v: StockFilter) => {
      setFilters({ stockFilter: v, page: 1 });
    },
    setVariantsFilter: (v: VariantsFilter) => {
      setFilters({ variantsFilter: v, page: 1 });
    },
    setPriceMin: (v: number | null) => {
      setFilters({ priceMin: v, page: 1 });
    },
    setPriceMax: (v: number | null) => {
      setFilters({ priceMax: v, page: 1 });
    },
    setPage: (v: number) => {
      setFilters({ page: v });
    },
    resetFilters,
    // UI state
    selectedProductId,
    viewMode,
    setSelectedProductId,
    setViewMode,
    // Query
    productsQuery,
    // Mutations
    updateProductMutation,
    deleteProductMutation,
    togglePublishMutation,
  };
}
