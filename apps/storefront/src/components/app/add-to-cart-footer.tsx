"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { useCartStore } from "@/stores/cart.store";

interface AddToCartFooterProps {
	productId: string;
	stock: number;
	price: number;
	currency?: string;
	selectedVariantId?: string;
}

export function AddToCartFooter({
	productId,
	stock,
	price,
	currency = "TND",
	selectedVariantId,
}: AddToCartFooterProps) {
	const t = useTranslations("storefront.store.product.addToCart");
	const addItem = useCartStore((state) => state.addItem);
	const [quantity, setQuantity] = useState(1);

	// Reset quantity when variant changes
	useEffect(() => {
		setQuantity(1);
	}, [selectedVariantId]);

	const isOutOfStock = stock === 0;
	const maxQuantity = Math.min(stock, 99);
	const formattedPrice = price.toFixed(3);

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleIncrease = () => {
		if (quantity < maxQuantity) {
			setQuantity(quantity + 1);
		}
	};

	const handleAddToCart = () => {
		if (!isOutOfStock) {
			// Add variant support - variantId is passed to cart store
			addItem(productId, quantity, selectedVariantId);
		}
	};

	return (
		<div className="fixed inset-x-0 bottom-0 z-40 mb-0 border-border border-t bg-background/95 backdrop-blur-sm">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center gap-3">
					{/* Quantity Selector */}
					<QuantitySelector
						quantity={quantity}
						onDecrease={handleDecrease}
						onIncrease={handleIncrease}
						min={1}
						max={maxQuantity}
						disabled={isOutOfStock}
						size="md"
					/>

					{/* Add to Cart Button with Price */}
					<Button
						className="flex-1 bg-primary text-primary-foreground"
						onClick={handleAddToCart}
						disabled={isOutOfStock}
					>
						<div className="flex flex-1 items-center justify-between">
							<div className="flex items-center gap-2">
								<Icons.shoppingCart className="size-4" />
								<span>{isOutOfStock ? t("outOfStock") : t("button")}</span>
							</div>
							<span className="text-sm">-</span>
							<span className="font-semibold">
								{formattedPrice} {currency}
							</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}
