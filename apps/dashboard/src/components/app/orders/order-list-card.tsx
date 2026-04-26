"use client";

import {
  ORDER_STATUS_BADGE_VARIANT,
  OrderEntity,
} from "@dukkani/common/entities/order/entity";
import type { OrderListItemOutput } from "@dukkani/common/schemas/order/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import { SwipeableCard } from "@dukkani/ui/components/swipeable-card";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { appMutations } from "@/shared/api/mutations";
import { RoutePaths } from "@/shared/config/routes";
import { getItemsCount, getOrderTotal } from "@/shared/lib/order/order.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

interface OrderListCardProps {
  order: OrderListItemOutput;
}

export function OrderListCard({ order }: OrderListCardProps) {
  const t = useTranslations("orders.list");
  const router = useRouter();
  const updateStatusMutation = useMutation(appMutations.order.updateStatus());

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
  const formatPrice = useFormatPriceForActiveStore();

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
      <div className="flex flex-col gap-3">
        {/* Top row: Name and Status */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-base text-foreground">
            {order.customer?.name ?? "—"}
          </h3>
          <Badge variant={badgeVariant} className="shrink-0 font-normal">
            {t(statusTranslationKey)}
          </Badge>
        </div>

        {/* Middle row: ID, Items, Payment */}
        <div className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
          <span className="font-bold text-foreground">#{order.id}</span>
          <span>{t("itemsCount", { count: itemsCount })}</span>
          <span className="font-normal">{paymentLabel}</span>
        </div>

        {/* Bottom row: Location and Total */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Icons.mapPin className="size-4" />
            <span>
              {order.address
                ? `${order.address.city}, ${order.address.postalCode}`
                : "—"}
            </span>
          </div>
          <p className="font-bold text-foreground text-lg">
            {formatPrice(total)}
          </p>
        </div>
      </div>
    </SwipeableCard>
  );
}
