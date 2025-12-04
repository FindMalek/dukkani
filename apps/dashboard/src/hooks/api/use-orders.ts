import type { ListOrdersInput } from "@dukkani/common/schemas/order/input";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useOrders(input: ListOrdersInput) {
	return useQuery(orpc.order.getAll.queryOptions({ input }));
}
