"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCartStore } from "@/stores/cart.store";
import { ProductCard } from "./product-card";
import { QuickAddToCart } from "./quick-add-to-cart";

interface ProductGridProps {
	products: ProductPublicOutput[];
}

export function ProductGrid({ products }: ProductGridProps) {
	const t = useTranslations("storefront.store.products");
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
						/>
					))}
				</div>
			</div>
			{selectedProduct && (
				<QuickAddToCart
					product={selectedProduct}
					open={isCartDrawerOpen}
					onOpenChange={setIsCartDrawerOpen}
				/>
			)}
		</>
	);
}
