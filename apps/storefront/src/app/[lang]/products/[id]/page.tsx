import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductDescription } from "@/components/app/product-description";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import { ProductVariantManager } from "@/components/app/product-variant-manager";
import { StoreInfoCard } from "@/components/app/store-info-card";
import { getQueryClient, orpc } from "@/lib/orpc";
import { parseProductIdFromParam } from "@/lib/product-id";

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: rawId } = await params;

	const id = parseProductIdFromParam(rawId);
	if (!id) return notFound();

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
				<div className="min-h-screen bg-background">
					<div className="container mx-auto px-4 py-4">
						<ProductImageCarousel
							images={product.imagesUrls || []}
							productName={product.name}
						/>
						<div className="mt-4 space-y-4">
							<h1 className="font-bold text-foreground text-xl">
								{product.name}
							</h1>
							<ProductAttributes tags={product.tags} />
							{product.store && (
								<StoreInfoCard
									storeName={product.store.name}
									storeSlug={product.store.slug}
									ownerName={product.store.owner?.name}
									ownerImage={product.store.owner?.image}
									isOpen={isStoreOpen}
								/>
							)}
							<ProductVariantManager
								productId={product.id}
								productStock={product.stock}
								productPrice={product.price}
								hasVariants={hasVariants}
								variantOptions={product.variantOptions}
								variants={product.variants}
							/>
							<ProductDescription description={product.description} />
						</div>
					</div>
				</div>
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
