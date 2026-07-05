"use client";

import {
  ORDER_STATUS_BADGE_VARIANT,
  OrderEntity,
} from "@dukkani/common/entities/order/entity";
import type { CustomerIncludeOutput } from "@dukkani/common/schemas/customer/output";
import { Badge } from "@dukkani/ui/components/badge";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

interface CustomerDetailOrdersCardProps {
  orders: CustomerIncludeOutput["orders"];
}

export function CustomerDetailOrdersCard({
  orders,
}: CustomerDetailOrdersCardProps) {
  const t = useTranslations("customers.detail.orders");
  const tOrderList = useTranslations("orders.list");
  const router = useRouter();
  const formatPrice = useFormatPriceForActiveStore();

  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm">
      <p className="mb-2 font-medium text-muted-foreground text-xs">
        {t("title")}
      </p>
      {orders.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("empty")}</p>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <button
              key={order.id}
              type="button"
              className="flex w-full items-center justify-between gap-2 py-2 text-start first:pt-0 last:pb-0"
              onClick={() =>
                router.push(RoutePaths.ORDERS.DETAIL.url(order.id))
              }
            >
              <div className="min-w-0">
                <p className="font-medium text-sm">#{order.id}</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={
                    ORDER_STATUS_BADGE_VARIANT[order.status] ?? "outline"
                  }
                  className="font-normal"
                >
                  {tOrderList(OrderEntity.getStatusLabelKey(order.status))}
                </Badge>
                <p className="font-semibold text-sm">
                  {formatPrice(order.total)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
