import type { ListProductsInput } from "@dukkani/common/schemas/product/input";
import { useMemo } from "react";
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useProductsQuery,
	useTogglePublishProductMutation,
	useUpdateProductMutation,
} from "@/hooks/api/use-products.hook";
import { useActiveStoreStore } from "@/stores/active-store.store";
import { useProductStore } from "@/stores/product.store";

/**
 * Controller hook that composes:
 * - Active store state
 * - Product store state (filters, pagination, selection)
 * - ORPC query hooks
 * - ORPC mutation hooks
 *
 * Provides a single interface for Products pages
 */
export function useProductsController() {
	const { selectedStoreId } = useActiveStoreStore();
	const {
		search,
		categoryId,
		published,
		stockFilter,
		variantsFilter,
		priceMin,
		priceMax,
		page,
		limit,
		selectedProductId,
		viewMode,
		setSearch,
		setCategoryId,
		setPublished,
		setStockFilter,
		setVariantsFilter,
		setPriceMin,
		setPriceMax,
		setPage,
		setLimit,
		setSelectedProductId,
		setViewMode,
		resetFilters,
	} = useProductStore();

	// Build query input from store state
	const queryInput = useMemo<ListProductsInput>(() => {
		const input: ListProductsInput = {
			page,
			limit,
			storeId: selectedStoreId ?? undefined,
		};

		if (search) input.search = search;
		if (categoryId) input.categoryId = categoryId;
		if (published !== null) input.published = published;
		if (stockFilter && stockFilter !== "all") {
			input.stockFilter = stockFilter;
		}
		if (variantsFilter && variantsFilter !== "all") {
			input.variantsFilter = variantsFilter;
		}
		if (priceMin != null) input.priceMin = priceMin;
		if (priceMax != null) input.priceMax = priceMax;

		return input;
	}, [
		selectedStoreId,
		search,
		categoryId,
		published,
		stockFilter,
		variantsFilter,
		priceMin,
		priceMax,
		page,
		limit,
	]);

	// Query products
	const productsQuery = useProductsQuery(queryInput);

	// Mutations
	const createProductMutation = useCreateProductMutation();
	const updateProductMutation = useUpdateProductMutation();
	const deleteProductMutation = useDeleteProductMutation();
	const togglePublishMutation = useTogglePublishProductMutation();

	return {
		// Store state
		selectedStoreId,
		search,
		categoryId,
		published,
		stockFilter,
		variantsFilter,
		priceMin,
		priceMax,
		page,
		limit,
		selectedProductId,
		viewMode,
		// Store actions
		setSearch,
		setCategoryId,
		setPublished,
		setStockFilter,
		setVariantsFilter,
		setPriceMin,
		setPriceMax,
		setPage,
		setLimit,
		setSelectedProductId,
		setViewMode,
		resetFilters,
		// Query
		productsQuery,
		// Mutations
		createProductMutation,
		updateProductMutation,
		deleteProductMutation,
		togglePublishMutation,
	};
}
