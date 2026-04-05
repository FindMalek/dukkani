"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";
import { ProductCard } from "./product-card";
import { QuickAddToCart } from "./quick-add-to-cart";

interface ProductGridProps {
  products: ProductPublicOutput[];
  store: StorePublicOutput;
}

export function ProductGrid({ products, store }: ProductGridProps) {
  const t = useTranslations("storefront.store.products");
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductPublicOutput | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const handleAddToCart = (product: ProductPublicOutput) => {
    const hasVariants = product.variants && product.variants.length > 0;

    if (hasVariants) {
      setSelectedProduct(product);
      setIsCartDrawerOpen(true);
    } else if ((product.addonGroups ?? []).some((g) => g.required)) {
      router.push(RoutePaths.PRODUCTS.DETAIL.url(product.id));
    } else {
      addItem(product.id, 1);
      setCartDrawerOpen(true);
    }
  };

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
        {t("empty")}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              storeCurrency={store.currency}
            />
          ))}
        </div>
      </div>
      {selectedProduct && (
        <QuickAddToCart
          product={selectedProduct}
          open={isCartDrawerOpen}
          onOpenChange={setIsCartDrawerOpen}
          storeCurrency={store.currency}
        />
      )}
    </>
  );
}
