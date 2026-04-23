"use client";

import type { ListProductOutput } from "@dukkani/common/schemas/product/output";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { useTranslations } from "next-intl";
import { RoutePaths, useRouter } from "@/shared/config/routes";
import { useCartStore } from "@/shared/lib/cart/store";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: ListProductOutput[];
  store: StorePublicOutput;
}

export function ProductGrid({ products, store }: ProductGridProps) {
  const t = useTranslations("storefront.store.products");
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);

  const handleAddToCart = (product: ListProductOutput) => {
    const hasVariants = (product.variantCount ?? 0) > 0;
    if (hasVariants || product.hasRequiredAddonGroups) {
      router.push(RoutePaths.PRODUCTS.DETAIL.url(product.id));
      return;
    }
    addItem(product.id, 1);
    setCartDrawerOpen(true);
  };

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
        {t("empty")}
      </div>
    );
  }

  return (
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
  );
}
