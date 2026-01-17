import { orpc } from "@/lib/orpc";

/**
 * Centralized query key factory for ORPC queries
 * Provides type-safe query keys for consistent invalidation
 */
export const queryKeys = {
	stores: {
		all: () => orpc.store.getAll.queryKey(),
	},
	products: {
		all: (input?: Parameters<typeof orpc.product.getAll.queryOptions>[0]) =>
			orpc.product.getAll.queryKey(input),
		byId: (id: string) => orpc.product.getById.queryKey({ input: { id } }),
	},
	orders: {
		all: (input?: Parameters<typeof orpc.order.getAll.queryOptions>[0]) =>
			orpc.order.getAll.queryKey(input),
		byId: (id: string) => orpc.order.getById.queryKey({ input: { id } }),
	},
	dashboard: {
		stats: () => orpc.dashboard.getStats.queryKey(),
	},
	telegram: {
		status: () => orpc.telegram.getStatus.queryKey(),
		botLink: () => orpc.telegram.getBotLink.queryKey(),
	},
	onboarding: {
		complete: (
			input?: Parameters<typeof orpc.onboarding.complete.queryOptions>[0],
		) => orpc.onboarding.complete.queryKey(input),
	},
} as const;
