"use client";

import type { CartItemOutput } from "@dukkani/common/schemas/cart/output";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
	items: CartItemOutput[];
	shippingCost: number;
	loading: boolean;
}

export function OrderSummary({
	items,
	shippingCost,
	loading,
}: OrderSummaryProps) {
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
				{loading ? (
					<div className="space-y-3">
						<Skeleton className="h-5 w-32" />
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className="flex justify-between py-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-16" />
							</div>
						))}
						<Skeleton className="h-px w-full" />
						<div className="space-y-2 pt-3">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-5 w-24" />
						</div>
					</div>
				) : (
					items.map((item) => (
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
									<span
										className="shrink-0 font-medium text-sm tabular-nums"
										dir="ltr"
									>
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
					))
				)}
			</div>
			<div className="mt-3 space-y-1 border-t pt-3 text-sm">
				<div className="flex items-center justify-between text-muted-foreground">
					<span>{t("subtotal")}</span>
					<span className="tabular-nums" dir="ltr">
						{subtotal.toFixed(3)} TND
					</span>
				</div>
				<div className="flex items-center justify-between text-muted-foreground">
					<span>{t("shipping")}</span>
					<span className="tabular-nums" dir="ltr">
						{shippingLabel}
					</span>
				</div>
				<div className="flex items-center justify-between border-t pt-2 font-semibold">
					<span>{t("total")}</span>
					<span className="tabular-nums" dir="ltr">
						{total.toFixed(3)} TND
					</span>
				</div>
			</div>
		</div>
	);
}
