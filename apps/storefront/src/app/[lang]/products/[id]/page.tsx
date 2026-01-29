import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/app/product-detail-content";
import { getQueryClient, orpc } from "@/lib/orpc";

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const queryClient = getQueryClient();

	try {
		await queryClient.prefetchQuery(
			orpc.product.getByIdPublic.queryOptions({
				input: { id },
			}),
		);

		const product = queryClient.getQueryData(
			orpc.product.getByIdPublic.queryKey({ input: { id } }),
		);

		if (!product) {
			return notFound();
		}

		// Determine if store is open (simplified - will be enhanced when opening hours are implemented)
		const isStoreOpen = true;

		// Check if product has variants
		const hasVariants = (product.variants?.length ?? 0) > 0;

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProductDetailContent
					product={product}
					isStoreOpen={isStoreOpen}
					hasVariants={hasVariants}
				/>
			</HydrationBoundary>
		);
	} catch (error) {
		if (error instanceof ORPCError && error.status === 404) {
			return notFound();
		}

		// Log unexpected errors
		console.error("Product detail page error:", error);
		return notFound();
	}
}
