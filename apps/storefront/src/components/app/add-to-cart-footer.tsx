"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface AddToCartFooterProps {
	stock: number;
	price: number;
	currency?: string;
	onAddToCart: (quantity: number) => void;
	selectedVariantId?: string;
}

export function AddToCartFooter({
	stock,
	price,
	currency = "TND",
	onAddToCart,
	selectedVariantId,
}: AddToCartFooterProps) {
	const t = useTranslations("storefront.store.product.addToCart");
	const [quantity, setQuantity] = useState(1);

	const isOutOfStock = stock === 0;
	const maxQuantity = Math.min(stock, 99);
	const formattedPrice = (price * quantity).toFixed(2);

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
			onAddToCart(quantity);
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
