import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductHeader } from "@/components/app/product-header";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import { StoreInfoCard } from "@/components/app/store-info-card";
import { getQueryClient, orpc } from "@/lib/orpc";

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string; lang: string }>;
}) {
	const { id } = await params;
	const queryClient = getQueryClient();

	try {
		// TODO: Replace with actual public product endpoint when created
		await queryClient.prefetchQuery(
			orpc.product.getByIdPublic?.queryOptions?.({ input: { id } }) || {
				queryKey: ["product", id],
				queryFn: async () => {
					throw new Error("Public product endpoint not yet implemented");
				},
			},
		);

		const product = queryClient.getQueryData(["product", id]);

		if (!product) {
			return notFound();
		}

		// TODO: Get store info for the store card
		// This will need to be included in the product response or fetched separately

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<div className="min-h-screen bg-background">
					<div className="h-[49px]" />
					<div className="container mx-auto px-4 py-4">
						<ProductImageCarousel
							images={product.imagesUrls || []}
							productName={product.name}
						/>
						<div className="mt-4 space-y-4">
							<ProductHeader name={product.name} price={product.price} />
							<ProductAttributes tags={product.tags} />
							{/* TODO: Add StoreInfoCard when store data is available */}
							{/* TODO: Add SizeSelector when variants are implemented */}
							{/* TODO: Add ProductDescription */}
						</div>
					</div>
					{/* TODO: Add AddToCartFooter (sticky at bottom) */}
				</div>
			</HydrationBoundary>
		);
	} catch (error) {
		return notFound();
	}
}
