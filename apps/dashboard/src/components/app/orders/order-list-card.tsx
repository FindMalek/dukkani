"use client";

import {
	ORDER_STATUS_BADGE_VARIANT,
	OrderEntity,
} from "@dukkani/common/entities/order/entity";
import type { OrderIncludeOutput } from "@dukkani/common/schemas/order/output";
import { formatCurrency } from "@dukkani/common/utils";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import { SwipeableCard } from "@dukkani/ui/components/swipeable-card";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { useUpdateOrderStatusMutation } from "@/hooks/api/use-orders.hook";
import { getItemsCount, getOrderTotal } from "@/lib/order-utils";
import { RoutePaths } from "@/lib/routes";

interface OrderListCardProps {
	order: OrderIncludeOutput;
}

export function OrderListCard({ order }: OrderListCardProps) {
	const locale = useLocale();
	const t = useTranslations("orders.list");
	const router = useRouter();
	const updateStatusMutation = useUpdateOrderStatusMutation();

	const total = getOrderTotal(order);
	const itemsCount = getItemsCount(order);
	const paymentLabel = t(
		OrderEntity.getPaymentMethodLabelKey(order.paymentMethod),
	);
	const badgeVariant = ORDER_STATUS_BADGE_VARIANT[order.status] ?? "outline";
	const statusTranslationKey = OrderEntity.getStatusLabelKey(order.status);
	const nextStatus = OrderEntity.getNextStatus(order.status);
	const canCall = !!order.customer?.phone;
	const canAdvance = nextStatus !== null;
	const isPending = updateStatusMutation.isPending;

	const actions = useMemo(
		() => [
			canCall
				? {
						side: "right" as const,
						className: "bg-green-500",
						icon: <Icons.phone className="size-5" />,
						label: t("call"),
						onTrigger: () => {
							window.location.href = `tel:${order.customer?.phone}`;
						},
					}
				: undefined,
			canAdvance && nextStatus
				? {
						side: "left" as const,
						className: "bg-primary",
						icon: <Icons.chevronRight className="size-5" />,
						label: t("advanceStatus"),
						onTrigger: () => {
							updateStatusMutation.mutate({ id: order.id, status: nextStatus });
						},
					}
				: undefined,
		],
		[
			canCall,
			canAdvance,
			nextStatus,
			order.customer?.phone,
			order.id,
			t,
			updateStatusMutation,
		],
	);

	return (
		<SwipeableCard
			actions={actions}
			onTap={() => router.push(RoutePaths.ORDERS.DETAIL.url(order.id))}
			disabled={isPending}
			aria-label={t("viewOrder", { id: order.id })}
		>
			{/* Top row: Name and Status */}
			<div className="flex items-center justify-between gap-2">
				<h3 className="font-semibold text-base text-foreground">
					{order.customer?.name ?? "—"}
				</h3>
				<Badge variant={badgeVariant} className="shrink-0 font-normal">
					{t(statusTranslationKey)}
				</Badge>
			</div>

			{/* Bottom row: ID, Items/Payment, and Total */}
			<div className="flex items-end justify-between gap-4">
				<div className="flex flex-col gap-1">
					<p className="font-bold text-base text-foreground">#{order.id}</p>
					<p className="text-muted-foreground text-sm">
						{t("itemsCount", { count: itemsCount })} • {paymentLabel}
					</p>
				</div>

				<div className="flex items-center gap-2">
					<p className="font-bold text-foreground text-lg">
						{formatCurrency(total, "TND", locale)}
					</p>
					<Icons.chevronRight className="size-5 shrink-0 text-muted-foreground" />
				</div>
			</div>
		</SwipeableCard>
	);
}
