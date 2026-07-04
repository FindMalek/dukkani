"use client";

import type { CustomerListItemOutput } from "@dukkani/common/schemas/customer/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { Icons } from "@dukkani/ui/components/icons";
import { SwipeableCard } from "@dukkani/ui/components/swipeable-card";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { RoutePaths } from "@/shared/config/routes";
import { useFormatOrderRelativeDateTime } from "@/shared/lib/i18n/use-format-order-relative-datetime";
import { getContactHref } from "@/shared/lib/phone/contact-href.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

interface CustomerListCardProps {
  customer: CustomerListItemOutput;
  selectionMode: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}

export function CustomerListCard({
  customer,
  selectionMode,
  selected,
  onToggleSelect,
}: CustomerListCardProps) {
  const t = useTranslations("customers.list");
  const tGov = useTranslations("customers.list.governorates");
  const router = useRouter();
  const formatPrice = useFormatPriceForActiveStore();
  const lastOrderLabel = useFormatOrderRelativeDateTime(
    customer.lastOrderAt ?? undefined,
  );

  // Selection mode must NOT use SwipeableCard's `disabled` prop: it
  // early-returns in handlePointerDown, so startXRef never gets set and
  // handlePointerUp's guard silently blocks onTap too (see swipeable-card.tsx).
  // Passing `actions={[]}` suppresses the swipe reveal without touching `onTap`.
  const actions = useMemo(
    () =>
      selectionMode
        ? []
        : [
            {
              side: "right" as const,
              className: "bg-green-500",
              icon: <Icons.whatsapp className="size-5" />,
              label: t("messageOnWhatsApp"),
              onTrigger: () => {
                window.location.href = getContactHref(
                  customer.phone,
                  true,
                  t("waPrefill", { name: customer.name }),
                );
              },
            },
          ],
    [selectionMode, customer.phone, customer.name, t],
  );

  return (
    <SwipeableCard
      actions={actions}
      onTap={() =>
        selectionMode
          ? onToggleSelect()
          : router.push(RoutePaths.CUSTOMERS.DETAIL.url(customer.id))
      }
      aria-label={customer.name}
    >
      <div className="flex items-start gap-3">
        {selectionMode && (
          <Checkbox
            checked={selected}
            onCheckedChange={onToggleSelect}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 ms-0.5 shrink-0"
            aria-label={customer.name}
          />
        )}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base text-foreground">
              {customer.name}
            </h3>
            {customer.governorates[0] && (
              <Badge variant="outline" className="shrink-0 font-normal">
                {tGov(customer.governorates[0])}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground text-sm">{customer.phone}</p>

          <div className="flex items-end justify-between gap-4 border-t pt-3">
            <div>
              <p className="text-muted-foreground text-xs">
                {t("ordersCount", { count: customer.orderCount })}
              </p>
              <p className="font-bold text-foreground">
                {formatPrice(customer.totalSpent)}
              </p>
            </div>
            <p className="text-muted-foreground text-xs">{lastOrderLabel}</p>
          </div>
        </div>
      </div>
    </SwipeableCard>
  );
}
