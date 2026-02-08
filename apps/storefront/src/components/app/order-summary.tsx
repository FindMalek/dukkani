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
		shippingCost === 0 ? t("free") : `${shippingCost.toFixed(3)} TND`;

	if (variant === "minimal") {
		return (
			<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1 text-sm">
				<div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-0.5">
					{items.map((item) => (
						<span
							key={`${item.productId}-${item.variantId ?? "no-variant"}`}
							className="min-w-0 truncate font-medium"
						>
							{item.productName}
							{item.quantity >= 2 ? ` · ${item.quantity}` : ""}
						</span>
					))}
				</div>
				<div className="shrink-0 font-semibold">
					{t("total")} {total.toFixed(3)} TND
				</div>
			</div>
		);
	}

	// Expanded variant: header-like, no card, scrollable
	return (
		<div className="max-h-[40vh] overflow-y-auto py-2">
			<h2 className="mb-2 font-semibold text-sm">{t("title")}</h2>
			<div className="space-y-0">
				{items.map((item) => (
					<div
						key={`${item.productId}-${item.variantId ?? "no-variant"}`}
						className="border-border/60 border-b py-2 last:border-b-0"
					>
						<div className="flex items-start justify-between gap-2">
							<span className="font-medium text-sm">{item.productName}</span>
							<span className="shrink-0 font-medium text-sm">
								{(item.price * item.quantity).toFixed(3)} TND
							</span>
						</div>
						{item.productDescription && (
							<div className="mt-0.5 text-muted-foreground text-xs">
								{item.productDescription}
							</div>
						)}
						<div className="mt-0.5 text-muted-foreground text-xs">
							{t("quantity")}: {item.quantity}
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
