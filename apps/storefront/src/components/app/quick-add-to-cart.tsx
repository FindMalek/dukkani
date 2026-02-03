"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Icons } from "@dukkani/ui/components/icons";
import { QuantitySelector } from "@dukkani/ui/components/quantity-selector";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ProductAttributes } from "@/components/app/product-attributes";
import { VariantSelector } from "@/components/shared/variant-selector";
import { useProductVariantSelection } from "@/hooks/use-product-variant-selection";
import { useCartStore } from "@/stores/cart.store";

interface QuickAddToCartProps {
	product: ProductPublicOutput;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function QuickAddToCart({
	product,
	open,
	onOpenChange,
}: QuickAddToCartProps) {
	const t = useTranslations("storefront.store.product");
	const hasVariants = (product.variants?.length ?? 0) > 0;

	const {
		selectedVariantId,
		setSelectedVariantId,
		stock,
		price,
		isOutOfStock,
	} = useProductVariantSelection({
		hasVariants,
		variants: product.variants,
		productStock: product.stock,
		productPrice: product.price,
	});

	const [quantity, setQuantity] = useState(1);
	const addItem = useCartStore((state) => state.addItem);
	const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);

	// Reset quantity when variant changes
	useEffect(() => {
		setQuantity(1);
	}, [selectedVariantId]);

	const maxQuantity = Math.min(stock, 99);
	const formattedPrice = (price * quantity).toFixed(3);

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
			addItem(product.id, quantity, selectedVariantId);
			setCartDrawerOpen(true);
			onOpenChange(false);
		}
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="flex max-h-[90vh] flex-col">
				<DrawerHeader className="sr-only">
					<DrawerTitle>{product.name}</DrawerTitle>
					{product.description && (
						<DrawerDescription>{product.description}</DrawerDescription>
					)}
				</DrawerHeader>

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto px-4 pb-4">
					{/* Product Info - Same branding as detail page */}
					<div className="space-y-3">
						{/* Product Name */}
						<h2 className="font-bold text-foreground text-xl">
							{product.name}
						</h2>

						{/* Tags */}
						<ProductAttributes tags={product.tags} />

						{/* Variant Selector - Only if has variants */}
						{hasVariants && (
							<div className="pt-2">
								<VariantSelector
									variantOptions={product.variantOptions}
									variants={product.variants}
									selectedVariantId={selectedVariantId}
									onVariantSelect={setSelectedVariantId}
								/>
							</div>
						)}

						{/* Quantity Selector - Compact, inline */}
						<div className="flex items-center justify-between border-border border-t pt-4">
							<span className="font-medium text-foreground text-sm">
								{t("quickAdd.quantity")}
							</span>
							<QuantitySelector
								quantity={quantity}
								onDecrease={handleDecrease}
								onIncrease={handleIncrease}
								min={1}
								max={maxQuantity}
								disabled={isOutOfStock}
								size="sm"
							/>
						</div>

						{/* Stock Warning */}
						{isOutOfStock && (
							<p className="font-medium text-destructive text-sm">
								{t("addToCart.outOfStock")}
							</p>
						)}
					</div>
				</div>

				{/* Footer - Same style as cart drawer */}
				<DrawerFooter className="border-border border-t">
					<Button
						className="w-full bg-primary text-primary-foreground"
						size="lg"
						onClick={handleAddToCart}
						disabled={isOutOfStock}
					>
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center gap-2">
								<Icons.shoppingCart className="size-4" />
								<span>
									{isOutOfStock
										? t("addToCart.outOfStock")
										: t("addToCart.button")}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-semibold text-sm">
									{formattedPrice} TND
								</span>
								<Icons.arrowRight className="size-4" />
							</div>
						</div>
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
