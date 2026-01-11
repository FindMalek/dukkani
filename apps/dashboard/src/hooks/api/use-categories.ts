import type { ListCategoriesInput } from "@dukkani/common/schemas/category/input";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useCategories(input: ListCategoriesInput) {
	return useQuery(orpc.category.getAll.queryOptions({ input }));
}
