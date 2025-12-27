import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useStores() {
	return useQuery(orpc.store.getAll.queryOptions({ input: undefined }));
}
