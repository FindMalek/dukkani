"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductDescription } from "@/components/app/product-description";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import { ProductVariantManager } from "@/components/app/product-variant-manager";
import { StoreInfoCard } from "@/components/app/store-info-card";
import { CurrentProductProvider } from "@/contexts/current-product-context";

interface ProductDetailContentProps {
	product: ProductPublicOutput;
	isStoreOpen: boolean;
	hasVariants: boolean;
}

export function ProductDetailContent({
	product,
	isStoreOpen,
	hasVariants,
}: ProductDetailContentProps) {
	return (
		<CurrentProductProvider product={product}>
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
		</CurrentProductProvider>
	);
}
