import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useStoreBySlug(slug: string | null) {
	return useQuery({
		...orpc.store.getBySlugPublic.queryOptions({
			input: { slug: slug ?? "" },
		}),
		enabled: !!slug,
	});
}
