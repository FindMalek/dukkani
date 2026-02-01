"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Image from "next/image";
import { type CartItem as CartItemType, useCartStore } from "@/stores/cart.store";
import { Skeleton } from "@dukkani/ui/components/skeleton";

interface CartItemProps {
	item: CartItemType;
	productName: string;
	productImage?: string;
	productDescription?: string;
	price: number;
	stock: number;
	currency?: string;
}

export function CartItem({
	item,
	productName,
	productImage,
	productDescription,
	price,
	stock,
	currency = "TND",
}: CartItemProps) {
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	const isLowStock = stock <= 5 && stock > 0;
	const isOutOfStock = stock === 0;
	const maxQuantity = Math.min(stock, 99);
	const formattedPrice = (price * item.quantity).toFixed(3);

	const handleDecrease = () => {
		if (item.quantity > 1) {
			updateQuantity(item.productId, item.quantity - 1, item.variantId);
		}
	};

	const handleIncrease = () => {
		if (item.quantity < maxQuantity) {
			updateQuantity(item.productId, item.quantity + 1, item.variantId);
		}
	};

	const handleRemove = () => {
		removeItem(item.productId, item.variantId);
	};

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
							<p className="text-muted-foreground text-sm">
								{productDescription}
							</p>
						)}
						{isLowStock && !isOutOfStock && (
							<p className="font-medium text-destructive text-sm">
								Only {stock} left
							</p>
						)}
						{isOutOfStock && (
							<p className="font-medium text-destructive text-sm">
								Out of stock
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
					<div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50">
						<Button
							variant="ghost"
							size="icon"
							className="size-7"
							onClick={handleDecrease}
							disabled={item.quantity <= 1 || isOutOfStock}
						>
							<Icons.minus className="size-3.5" />
						</Button>
						<span className="min-w-6 text-center font-medium text-sm">
							{item.quantity}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="size-7"
							onClick={handleIncrease}
							disabled={item.quantity >= maxQuantity || isOutOfStock}
						>
							<Icons.plus className="size-3.5" />
						</Button>
					</div>

					{/* Price */}
					<span className="font-semibold text-foreground">
						{formattedPrice} {currency}
					</span>
				</div>
			</div>
		</div>
	);
}
