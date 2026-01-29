"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCurrentProduct } from "@/contexts/current-product-context";
import { capQuantity } from "@/lib/cart";
import { useCartStore } from "@/stores/cart.store";

interface AddToCartFooterProps {
	stock: number;
	price: number;
	currency?: string;
	selectedVariantId?: string;
}

export function AddToCartFooter({
	stock,
	price,
	currency = "TND",
	selectedVariantId,
}: AddToCartFooterProps) {
	const t = useTranslations("storefront.store.product.addToCart");
	const product = useCurrentProduct();
	const addItem = useCartStore((state) => state.addItem);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setQuantity(1);
	}, [selectedVariantId]);

	const isOutOfStock = stock === 0;
	const maxQuantity = Math.min(stock, 99);
	const formattedPrice = price.toFixed(2);

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
		if (isOutOfStock || !product) return;
		const capped = capQuantity(quantity, stock);
		const cartProduct = {
			id: product.id,
			name: product.name,
			imageUrl: product.imagesUrls?.[0],
			price,
			stock,
		};
		addItem(cartProduct, capped);
	};

	if (!product) return null;

	return (
		<div className="fixed inset-x-0 bottom-0 z-40 mb-0 border-border border-t bg-background/95 backdrop-blur-sm">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center gap-3">
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
						<span className="min-w-8 text-center font-medium">{quantity}</span>
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
