import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { ORPCError } from "@orpc/server";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductHeader } from "@/components/app/product-header";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import { StoreInfoCard } from "@/components/app/store-info-card";
import { SizeSelector } from "@/components/shared/size-selector";
import { ProductDescription } from "@/components/app/product-description";
import { AddToCartFooter } from "@/components/app/add-to-cart-footer";
import { getQueryClient, orpc } from "@/lib/orpc";
import { ProductDetailSkeleton } from "@/components/app/product-detail-skeleton";

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string; lang: string }>;
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
		const isStoreOpen = true; // TODO: Calculate from store.openingHours

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<div className="min-h-screen bg-background pb-20">
					<div className="h-[49px]" />
					<div className="container mx-auto px-4 py-4">
						<ProductImageCarousel
							images={product.imagesUrls || []}
							productName={product.name}
						/>
						<div className="mt-4 space-y-4">
							<ProductHeader name={product.name} price={product.price} />
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
							<SizeSelector
								variantOptions={product.variantOptions}
								variants={product.variants}
							/>
							<ProductDescription description={product.description} />
						</div>
					</div>
					<AddToCartFooter
						stock={product.stock}
						price={product.price}
						onAddToCart={(quantity) => {
							// TODO: Implement add to cart logic
							console.log("Add to cart", quantity);
						}}
					/>
				</div>
			</HydrationBoundary>
		);
	} catch (error) {
		if (error instanceof ORPCError && error.status === 404) {
			return notFound();
		}
		throw error;
	}
}
