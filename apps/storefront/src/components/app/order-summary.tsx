"use client";

import type { CartItemOutput } from "@dukkani/common/schemas/cart/output";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
	items: CartItemOutput[];
	shippingCost?: number;
}

const SHIPPING_COST = 12; // TND

export function OrderSummary({
	items,
	shippingCost = SHIPPING_COST,
}: OrderSummaryProps) {
	const t = useTranslations("storefront.store.checkout.orderSummary");

	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const total = subtotal + shippingCost;

	return (
		<div className="space-y-4">
			<h2 className="font-semibold text-lg">{t("title")}</h2>

			{/* Items List */}
			<div className="space-y-3">
				{items.map((item) => (
					<div
						key={`${item.productId}-${item.variantId ?? "no-variant"}`}
						className="flex items-center justify-between"
					>
						<div className="flex-1">
							<div className="font-medium">{item.productName}</div>
							{item.productDescription && (
								<div className="text-muted-foreground text-sm">
									{item.productDescription}
								</div>
							)}
							<div className="text-muted-foreground text-sm">
								{item.quantity}x
							</div>
						</div>
						<div className="font-medium">
							{(item.price * item.quantity).toFixed(3)} TND
						</div>
					</div>
				))}
			</div>

			{/* Summary */}
			<div className="border-t pt-4 space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">{t("subtotal")}</span>
					<span>{subtotal.toFixed(3)} TND</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">{t("shipping")}</span>
					<span>{shippingCost.toFixed(3)} TND</span>
				</div>
				<div className="flex items-center justify-between border-t pt-2 font-semibold text-lg">
					<span>{t("total")}</span>
					<span>{total.toFixed(3)} TND</span>
				</div>
			</div>
		</div>
	);
}
