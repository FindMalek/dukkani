import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function useDashboardStats() {
	return useQuery(orpc.dashboard.getStats.queryOptions());
}
