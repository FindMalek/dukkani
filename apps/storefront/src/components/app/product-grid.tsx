"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cart.store";
import { ProductCard } from "./product-card";

interface ProductGridProps {
	products: ProductPublicOutput[];
}

export function ProductGrid({ products }: ProductGridProps) {
	const t = useTranslations("storefront.store.products");
	const addItem = useCartStore((state) => state.addItem);

	const handleAddToCart = (product: ProductPublicOutput) => {
		addItem(product, 1);
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
					/>
				))}
			</div>
		</div>
	);
}
