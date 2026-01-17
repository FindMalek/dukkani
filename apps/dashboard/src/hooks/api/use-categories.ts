import type {
	CreateCategoryInput,
	ListCategoriesInput,
	UpdateCategoryInput,
} from "@dukkani/common/schemas/category/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";

/**
 * Query hook for fetching categories list
 */
export function useCategoriesQuery(input: ListCategoriesInput) {
	return useQuery(orpc.category.getAll.queryOptions({ input }));
}

/**
 * Query hook for fetching a single category by ID
 */
export function useCategoryQuery(id: string) {
	return useQuery(
		orpc.category.getById.queryOptions({
			input: { id },
		}),
	);
}

/**
 * Mutation hook for creating a category
 */
export function useCreateCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateCategoryInput) => client.category.create(input),
		onSuccess: (data) => {
			// Invalidate categories list queries for the store
			queryClient.invalidateQueries({
				queryKey: queryKeys.categories.all({
					input: { storeId: data.storeId },
				}),
			});
		},
	});
}

/**
 * Mutation hook for updating a category
 */
export function useUpdateCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: UpdateCategoryInput) => client.category.update(input),
		onSuccess: (data) => {
			// Invalidate categories list queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.categories.all({
					input: { storeId: data.storeId },
				}),
			});
			// Invalidate specific category
			queryClient.invalidateQueries({
				queryKey: queryKeys.categories.byId(data.id),
			});
		},
	});
}

/**
 * Mutation hook for deleting a category
 */
export function useDeleteCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => client.category.delete({ id }),
		onSuccess: (data) => {
			// Invalidate all categories list queries (with any input)
			queryClient.invalidateQueries({
				queryKey: queryKeys.categories.all({
					input: { storeId: data.storeId },
				}),
			});
		},
	});
}
