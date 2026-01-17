import type {
	CreateOrderInput,
	ListOrdersInput,
	UpdateOrderStatusInput,
} from "@dukkani/common/schemas/order/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";

/**
 * Query hook for fetching orders list
 */
export function useOrdersQuery(input: ListOrdersInput) {
	return useQuery(orpc.order.getAll.queryOptions({ input }));
}

/**
 * Query hook for fetching a single order by ID
 */
export function useOrderQuery(id: string) {
	return useQuery(
		orpc.order.getById.queryOptions({
			input: { id },
		}),
	);
}

/**
 * Mutation hook for creating an order
 */
export function useCreateOrderMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateOrderInput) => client.order.create(input),
		onSuccess: () => {
			// Invalidate orders list queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.orders.all(),
			});
			// Also invalidate dashboard stats since orders affect stats
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard.stats(),
			});
		},
	});
}

/**
 * Mutation hook for updating order status
 */
export function useUpdateOrderStatusMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: UpdateOrderStatusInput) =>
			client.order.updateStatus(input),
		onSuccess: (data) => {
			// Invalidate orders list and specific order
			queryClient.invalidateQueries({
				queryKey: queryKeys.orders.all(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.orders.byId(data.id),
			});
			// Also invalidate dashboard stats
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard.stats(),
			});
		},
	});
}

/**
 * Mutation hook for deleting an order
 */
export function useDeleteOrderMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => client.order.delete({ id }),
		onSuccess: () => {
			// Invalidate orders list queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.orders.all(),
			});
			// Also invalidate dashboard stats
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard.stats(),
			});
		},
	});
}
