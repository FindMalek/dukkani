"use client";

import { AddressEntity } from "@dukkani/common/entities/address/entity";
import {
	ORDER_STATUS_BADGE_VARIANT,
	OrderEntity,
} from "@dukkani/common/entities/order/entity";
import type { OrderIncludeOutput } from "@dukkani/common/schemas/order/output";
import { formatCurrency } from "@dukkani/common/utils";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
	formatOrderDateTime,
	getItemsCount,
	getOrderTotal,
} from "@/lib/order-utils";
import { RoutePaths } from "@/lib/routes";

interface OrderListCardProps {
	order: OrderIncludeOutput;
}

export function OrderListCard({ order }: OrderListCardProps) {
	const locale = useLocale();
	const t = useTranslations("orders.list");

	const total = getOrderTotal(order);
	const itemsCount = getItemsCount(order);
	const dateTimeStr = formatOrderDateTime(order.createdAt, new Date(), (key) =>
		t(key as "today" | "yesterday"),
	);
	const location = AddressEntity.formatShortLocation(order.address);
	const paymentLabel = t(
		OrderEntity.getPaymentMethodLabelKey(order.paymentMethod),
	);
	const badgeVariant = ORDER_STATUS_BADGE_VARIANT[order.status] ?? "outline";
	const statusTranslationKey = OrderEntity.getStatusLabelKey(order.status);

	const handleCallClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (order.customer?.phone) {
			window.location.href = `tel:${order.customer.phone}`;
		}
	};

	return (
		<Link
			href={RoutePaths.ORDERS.DETAIL.url(order.id)}
			className="group flex flex-col gap-3 rounded-xl border bg-card p-3 transition-all hover:shadow-sm"
			aria-label={t("viewOrder", { id: order.id })}
		>
			{/* Header: name + status */}
			<div className="flex items-start justify-between gap-2">
				<h3 className="line-clamp-1 font-semibold text-foreground text-sm">
					{order.customer?.name ?? "—"}
				</h3>
				<Badge variant={badgeVariant} size="sm" className="shrink-0">
					{t(statusTranslationKey)}
				</Badge>
			</div>

			{/* Order ID + date/time */}
			<p className="text-muted-foreground text-xs">
				#{order.id} • {dateTimeStr}
			</p>

			{/* Items + payment */}
			<p className="text-muted-foreground text-xs">
				{t("itemsCount", { count: itemsCount })} • {paymentLabel}
			</p>

			{/* Total */}
			<p className="font-bold text-base text-foreground">
				{formatCurrency(total, "TND", locale)}
			</p>

			{/* Phone + location */}
			<div className="flex items-center gap-1.5 text-muted-foreground text-xs">
				{order.customer?.phone && (
					<>
						<Icons.phone className="size-3.5 shrink-0" />
						<span>{order.customer.phone}</span>
					</>
				)}
				{order.customer?.phone && location && <span>•</span>}
				{location && <span>{location}</span>}
			</div>

			{/* Actions row */}
			<div className="flex items-center justify-end gap-2 pt-1">
				{order.customer?.phone && (
					<Button
						type="button"
						size="sm"
						className="shrink-0"
						onClick={handleCallClick}
						aria-label={t("call")}
					>
						<Icons.phone className="mr-1.5 size-3.5" />
						{t("call")}
					</Button>
				)}
				<Icons.chevronRight className="size-4 shrink-0 text-muted-foreground" />
			</div>
		</Link>
	);
}
