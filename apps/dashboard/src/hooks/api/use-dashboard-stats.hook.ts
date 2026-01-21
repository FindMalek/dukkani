import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useActiveStoreStore } from "@/stores/active-store.store";

export function useDashboardStats() {
	const { selectedStoreId } = useActiveStoreStore();

	return useQuery(
		orpc.dashboard.getStats.queryOptions({
			input: selectedStoreId ? { storeId: selectedStoreId } : undefined,
		}),
	);
}
