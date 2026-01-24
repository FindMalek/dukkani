import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { AddToCartFooter } from "@/components/app/add-to-cart-footer";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductDescription } from "@/components/app/product-description";
import { ProductHeader } from "@/components/app/product-header";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import { StoreInfoCard } from "@/components/app/store-info-card";
import { SizeSelector } from "@/components/shared/size-selector";
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
						productId={product.id}
						stock={product.stock}
						price={product.price}
						selectedVariantId={undefined} // TODO: Get from variant selection state
					/>
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
