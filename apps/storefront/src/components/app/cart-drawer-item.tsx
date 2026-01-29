"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { capQuantity } from "@/lib/cart";
import type { CartItem } from "@/stores/cart.store";

interface CartDrawerItemProps {
	item: CartItem;
	onRemove: () => void;
	onQuantityChange: (quantity: number) => void;
}

export function CartDrawerItem({
	item,
	onRemove,
	onQuantityChange,
}: CartDrawerItemProps) {
	const t = useTranslations("storefront.store.cart");
	const tProduct = useTranslations("storefront.store.product.addToCart");
	const { quantity, product } = item;
	const { name, imageUrl, price, stock } = product;
	const lineTotal = price * quantity;
	const maxQuantity = Math.min(stock, 99);
	const isOutOfStock = stock === 0;

	const handleDecrease = () => {
		if (quantity > 1) {
			onQuantityChange(quantity - 1);
		}
	};

	const handleIncrease = () => {
		if (quantity < maxQuantity && !isOutOfStock) {
			const next = capQuantity(quantity + 1, stock);
			onQuantityChange(next);
		}
	};

	return (
		<div className="flex gap-3">
			<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={name}
						fill
						className="object-cover"
						sizes="80px"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<Icons.shoppingCart className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-semibold text-sm leading-tight">{name}</h3>
					<Button
						variant="ghost"
						size="icon"
						className="size-9 shrink-0"
						onClick={onRemove}
						aria-label="Remove item"
					>
						<Icons.trash className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-1 rounded-lg border border-border">
						<Button
							variant="ghost"
							size="icon"
							className="size-9"
							onClick={handleDecrease}
							disabled={quantity <= 1}
							aria-label="Decrease quantity"
						>
							<Icons.minus className="size-4" />
						</Button>
						<span className="min-w-8 text-center font-medium text-sm">
							{quantity}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="size-9"
							onClick={handleIncrease}
							disabled={quantity >= maxQuantity || isOutOfStock}
							aria-label="Increase quantity"
						>
							<Icons.plus className="size-4" />
						</Button>
					</div>
					<span className="shrink-0 font-semibold text-sm">
						{lineTotal.toFixed(3)} TND
					</span>
				</div>
				{!isOutOfStock && quantity >= maxQuantity && maxQuantity > 0 && (
					<p className="text-muted-foreground text-xs">
						{t("item.onlyNLeft", { count: maxQuantity })}
					</p>
				)}
				{isOutOfStock && (
					<p className="text-destructive text-xs">{tProduct("outOfStock")}</p>
				)}
			</div>
		</div>
	);
}
