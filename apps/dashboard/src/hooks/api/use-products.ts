import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import type { ListProductsInput } from "@dukkani/common/schemas/product/input";

export function useProducts(input: ListProductsInput) {
	return useQuery(orpc.product.getAll.queryOptions({ input }));
}
