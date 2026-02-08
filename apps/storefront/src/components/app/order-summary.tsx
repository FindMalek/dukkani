"use client";

import type { CartItemOutput } from "@dukkani/common/schemas/cart/output";
import { useTranslations } from "next-intl";

export type OrderSummaryVariant = "expanded" | "minimal";

interface OrderSummaryProps {
	items: CartItemOutput[];
	shippingCost: number;
	variant: OrderSummaryVariant;
}

export function OrderSummary({
	items,
	shippingCost,
	variant,
}: OrderSummaryProps) {
	const t = useTranslations("storefront.store.checkout.orderSummary");

	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const total = subtotal + shippingCost;
	const shippingLabel =
		shippingCost === 0 ? "Free" : `${shippingCost.toFixed(3)} TND`;

	if (variant === "minimal") {
		return (
			<div className="space-y-2 px-4 py-3">
				{items.map((item) => (
					<div
						key={`${item.productId}-${item.variantId ?? "no-variant"}`}
						className="flex items-center justify-between gap-2 text-sm"
					>
						<span className="min-w-0 truncate font-medium">
							{item.productName}
							{item.quantity >= 2 ? ` · ${item.quantity}` : ""}
						</span>
						<span className="shrink-0 font-medium">
							{(item.price * item.quantity).toFixed(3)} TND
						</span>
					</div>
				))}
				<div className="flex items-center justify-between border-t pt-2 font-semibold">
					<span>{t("total")}</span>
					<span>{total.toFixed(3)} TND</span>
				</div>
			</div>
		);
	}

	// Expanded variant: card-style, full details
	return (
		<div className="max-h-[70vh] overflow-y-auto rounded-lg border bg-muted/50 p-4 md:max-h-none">
			<h2 className="mb-4 font-semibold text-lg">{t("title")}</h2>

			<div className="space-y-0">
				{items.map((item) => (
					<div
						key={`${item.productId}-${item.variantId ?? "no-variant"}`}
						className="border-border/60 border-b py-3 last:border-b-0"
					>
						<div className="flex items-start justify-between gap-2">
							<span className="font-medium">{item.productName}</span>
							<span className="shrink-0 font-medium">
								{(item.price * item.quantity).toFixed(3)} TND
							</span>
						</div>
						{item.productDescription && (
							<div className="mt-0.5 text-muted-foreground text-sm">
								{item.productDescription}
							</div>
						)}
						<div className="mt-0.5 text-muted-foreground text-sm">
							Qty: {item.quantity}
						</div>
					</div>
				))}
			</div>

			<div className="mt-4 space-y-2 border-t pt-4">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">{t("subtotal")}</span>
					<span>{subtotal.toFixed(3)} TND</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">{t("shipping")}</span>
					<span>{shippingLabel}</span>
				</div>
				<div className="flex items-center justify-between border-t pt-2 font-semibold text-lg">
					<span>{t("total")}</span>
					<span>{total.toFixed(3)} TND</span>
				</div>
			</div>
		</div>
	);
}
