import type {
	CreateProductInput,
	ListProductsInput,
	TogglePublishProductInput,
	UpdateProductInput,
} from "@dukkani/common/schemas/product/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";

/**
 * Query hook for fetching products list
 */
export function useProductsQuery(input: ListProductsInput) {
	return useQuery(orpc.product.getAll.queryOptions({ input }));
}

/**
 * Query hook for fetching a single product by ID
 */
export function useProductQuery(id: string) {
	return useQuery(
		orpc.product.getById.queryOptions({
			input: { id },
		}),
	);
}

/**
 * Mutation hook for creating a product
 */
export function useCreateProductMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateProductInput) => client.product.create(input),
		onSuccess: () => {
			// Invalidate products list queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.all(),
			});
		},
	});
}

/**
 * Mutation hook for updating a product
 */
export function useUpdateProductMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: UpdateProductInput) => client.product.update(input),
		onSuccess: (data) => {
			// Invalidate products list and specific product
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.all(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.byId(data.id),
			});
		},
	});
}

/**
 * Mutation hook for deleting a product
 */
export function useDeleteProductMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => client.product.delete({ id }),
		onSuccess: () => {
			// Invalidate products list queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.all(),
			});
		},
	});
}

/**
 * Mutation hook for toggling product publish status
 */
export function useTogglePublishProductMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: TogglePublishProductInput) =>
			client.product.togglePublish(input),
		onSuccess: (data) => {
			// Invalidate products list and specific product
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.all(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.byId(data.id),
			});
		},
	});
}
