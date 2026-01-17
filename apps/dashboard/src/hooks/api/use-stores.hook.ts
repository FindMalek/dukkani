import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";

/**
 * Query hook for fetching all stores
 */
export function useStoresQuery(enabled = true) {
	return useQuery({
		...orpc.store.getAll.queryOptions({ input: undefined }),
		enabled,
	});
}

/**
 * Mutation hook for creating a store
 */
export function useCreateStoreMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: () => {
			// Invalidate stores query
			queryClient.invalidateQueries({
				queryKey: queryKeys.stores.all(),
			});
		},
	});
}

/**
 * Mutation hook for configuring a store
 */
export function useConfigureStoreMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: ConfigureStoreOnboardingInput) =>
			client.store.configure(input),
		onSuccess: () => {
			// Invalidate stores query
			queryClient.invalidateQueries({
				queryKey: queryKeys.stores.all(),
			});
		},
	});
}
