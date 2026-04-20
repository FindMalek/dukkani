"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { useCallback, useState } from "react";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductDescription } from "@/components/app/product-description";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import {
  ProductVariantManager,
  type VariantSelectionResolved,
} from "@/components/app/product-variant-manager";
import { StoreInfoCard } from "@/components/app/store-info-card";
import { getGalleryIndexForVariantImage } from "@/shared/lib/product/variant-gallery-index.util";

export function ProductDetailInteractive({
  product,
  store,
  isStoreOpen,
}: {
  product: ProductPublicOutput;
  store: StorePublicOutput;
  isStoreOpen: boolean;
}) {
  const hasVariants = (product.variants?.length ?? 0) > 0;
  const [targetSlideIndex, setTargetSlideIndex] = useState<number | null>(null);

  const handleVariantSelectionResolved = useCallback(
    (ctx: VariantSelectionResolved) => {
      const idx = getGalleryIndexForVariantImage(
        product.imageUrls ?? [],
        ctx.imageUrl,
      );
      if (idx !== null) {
        setTargetSlideIndex(idx);
      }
    },
    [product.imageUrls],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <ProductImageCarousel
          images={product.imageUrls || []}
          productName={product.name}
          targetSlideIndex={targetSlideIndex}
        />
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-foreground text-xl">{product.name}</h1>
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
            storeCurrency={store.currency}
            onVariantSelectionResolved={handleVariantSelectionResolved}
          />
          <ProductDescription description={product.description} />
        </div>
      </div>
    </div>
  );
}
