"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
			// TODO: When variant support is added to cart, use selectedVariantId
			// For now, we add the product with variant info stored separately
			addItem(productId, quantity);
		}
	};

	return (
		<div className="fixed right-0 bottom-0 left-0 z-40 border-border border-t bg-background/95 backdrop-blur-sm">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center gap-3">
					{/* Quantity Selector */}
					<div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50">
						<Button
							variant="ghost"
							size="icon"
							className="size-8"
							onClick={handleDecrease}
							disabled={quantity <= 1 || isOutOfStock}
						>
							<Icons.minus className="size-4" />
						</Button>
						<span className="min-w-[2rem] text-center font-medium">
							{quantity}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="size-8"
							onClick={handleIncrease}
							disabled={quantity >= maxQuantity || isOutOfStock}
						>
							<Icons.plus className="size-4" />
						</Button>
					</div>

					{/* Add to Cart Button */}
					<Button
						className="flex-1 bg-primary text-primary-foreground"
						onClick={handleAddToCart}
						disabled={isOutOfStock}
					>
						<Icons.shoppingCart className="mr-2 size-4" />
						{isOutOfStock
							? t("outOfStock", { defaultValue: "Out of Stock" })
							: t("button", { defaultValue: "Add to Cart" })}
					</Button>
				</div>
			</div>
		</div>
	);
}
