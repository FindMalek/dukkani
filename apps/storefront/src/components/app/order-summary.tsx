"use client";

import type { CartItemOutput } from "@dukkani/common/schemas/cart/output";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
	items: CartItemOutput[];
	shippingCost: number;
}

export function OrderSummary({ items, shippingCost }: OrderSummaryProps) {
	const t = useTranslations("storefront.store.checkout.orderSummary");

	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const total = subtotal + shippingCost;
	const shippingLabel =
		shippingCost === 0 ? t("free") : `${shippingCost.toFixed(3)} TND`;

	return (
		<div className="py-2">
			<h2 className="mb-3 font-semibold text-base">{t("title")}</h2>
			<div className="space-y-0">
				{items.map((item) => (
					<div
						key={`${item.productId}-${item.variantId ?? "no-variant"}`}
						className="flex gap-3 border-border/60 border-b py-3 last:border-b-0"
					>
						<div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted">
							{item.productImage ? (
								<Image
									src={item.productImage}
									alt={item.productName}
									width={48}
									height={48}
									className="size-full object-cover"
								/>
							) : (
								<Skeleton className="size-full rounded-none" />
							)}
						</div>
						<div className="min-w-0 flex-1 space-y-0.5">
							<div className="flex items-start justify-between gap-2">
								<span className="min-w-0 truncate font-medium text-sm">
									{item.productName}
								</span>
								<span className="shrink-0 font-medium text-sm">
									{(item.price * item.quantity).toFixed(3)} TND
								</span>
							</div>
							{item.productDescription && (
								<p className="line-clamp-2 text-muted-foreground text-xs">
									{item.productDescription}
								</p>
							)}
							<p className="text-muted-foreground text-xs">
								{t("quantity")}: {item.quantity}
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="mt-3 space-y-1 border-t pt-3 text-sm">
				<div className="flex items-center justify-between text-muted-foreground">
					<span>{t("subtotal")}</span>
					<span>{subtotal.toFixed(3)} TND</span>
				</div>
				<div className="flex items-center justify-between text-muted-foreground">
					<span>{t("shipping")}</span>
					<span>{shippingLabel}</span>
				</div>
				<div className="flex items-center justify-between border-t pt-2 font-semibold">
					<span>{t("total")}</span>
					<span>{total.toFixed(3)} TND</span>
				</div>
			</div>
		</div>
	);
}
