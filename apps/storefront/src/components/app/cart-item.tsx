"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { QuantitySelector } from "@dukkani/ui/components/quantity-selector";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { memo, useCallback, useMemo } from "react";
import {
	type CartItem as CartItemType,
	useCartStore,
} from "@/stores/cart.store";

interface CartItemProps {
	item: CartItemType;
	productName: string;
	productImage?: string;
	productDescription?: string;
	price: number;
	stock: number;
	currency?: string;
}

export const CartItem = memo(function CartItem({
	item,
	productName,
	productImage,
	productDescription,
	price,
	stock,
	currency = "TND",
}: CartItemProps) {
	const t = useTranslations("storefront.store.cart.item");
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);

	const isLowStock = stock <= 5 && stock > 0;
	const isOutOfStock = stock === 0;
	const maxQuantity = Math.min(stock, 99);
	const formattedPrice = useMemo(
		() => (price * item.quantity).toFixed(3),
		[price, item.quantity],
	);

	const handleDecrease = useCallback(() => {
		if (item.quantity > 1) {
			updateQuantity(item.productId, item.quantity - 1, item.variantId);
		}
	}, [item.quantity, item.productId, item.variantId, updateQuantity]);

	const handleIncrease = useCallback(() => {
		if (item.quantity < maxQuantity) {
			updateQuantity(item.productId, item.quantity + 1, item.variantId);
		}
	}, [
		item.quantity,
		item.productId,
		item.variantId,
		maxQuantity,
		updateQuantity,
	]);

	const handleRemove = useCallback(() => {
		removeItem(item.productId, item.variantId);
	}, [item.productId, item.variantId, removeItem]);

	return (
		<div className="flex gap-3 border-border border-b py-4 last:border-b-0">
			{/* Product Image */}
			<div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
				{productImage ? (
					<Image
						src={productImage}
						alt={productName}
						fill
						className="object-cover"
						sizes="80px"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Skeleton className="size-full" />
					</div>
				)}
			</div>

			{/* Product Info */}
			<div className="flex flex-1 flex-col gap-1">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<h3 className="font-semibold text-foreground">{productName}</h3>
						{productDescription && (
							<p className="text-muted-foreground text-xs">
								{productDescription}
							</p>
						)}
						{isLowStock && !isOutOfStock && (
							<p className="font-medium text-destructive text-xs">
								{t("lowStock", { count: stock })}
							</p>
						)}
						{isOutOfStock && (
							<p className="font-medium text-destructive text-xs">
								{t("outOfStock")}
							</p>
						)}
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="size-6 shrink-0"
						onClick={handleRemove}
					>
						<Icons.trash className="size-4 text-muted-foreground" />
					</Button>
				</div>

				{/* Quantity and Price */}
				<div className="flex items-center justify-between">
					{/* Quantity Selector */}
					<QuantitySelector
						quantity={item.quantity}
						onDecrease={handleDecrease}
						onIncrease={handleIncrease}
						min={1}
						max={maxQuantity}
						disabled={isOutOfStock}
						size="sm"
					/>

					{/* Price */}
					<span className="font-semibold text-foreground">
						{formattedPrice} {currency}
					</span>
				</div>
			</div>
		</div>
	);
});
