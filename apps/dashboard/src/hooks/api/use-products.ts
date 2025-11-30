import type { ListProductsInput } from "@dukkani/common/schemas/product/input";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useProducts(input: ListProductsInput) {
	return useQuery(orpc.product.getAll.queryOptions({ input }));
}
