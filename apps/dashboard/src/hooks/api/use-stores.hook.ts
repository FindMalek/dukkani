import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

/**
 * Query hook for fetching all stores
 */
export function useStoresQuery() {
	return useQuery(orpc.store.getAll.queryOptions({ input: undefined }));
}