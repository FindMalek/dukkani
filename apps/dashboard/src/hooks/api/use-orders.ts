import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import type { ListOrdersInput } from "@dukkani/common/schemas/order/input";

export function useOrders(input: ListOrdersInput) {
	return useQuery(orpc.order.getAll.queryOptions({ input }));
}
