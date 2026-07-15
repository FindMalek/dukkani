"use client";

import type { OrderListItemOutput } from "@dukkani/common/schemas/order/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dukkani/ui/components/table";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";
import { useOrderListItemView } from "@/shared/lib/order/list-item-view.hook";
import type { OrderListDisplaySection } from "@/shared/lib/order/order.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

const TABLE_COLUMN_COUNT = 7;

interface OrdersTableProps {
  sections: OrderListDisplaySection[];
}

/**
 * Desktop (>=1280px / `xl:`) table presentation of the orders list.
 *
 * Mirrors the data already surfaced by {@link OrderListCard} — same fields,
 * same navigation target — just laid out for wide screens. `orders-grouped-list`
 * groups orders by date (today / yesterday / older); that grouping is
 * preserved here as row-group header rows spanning the table, rather than
 * dropped in favor of a sortable date column, per the issue's default.
 * Filtering, search and pagination all stay owned by `useOrdersController`;
 * this component is presentation only.
 */
export function OrdersTable({ sections }: OrdersTableProps) {
  const t = useTranslations("orders.list");

  return (
    <div className="hidden rounded-lg border xl:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>{t("table.orderNumber")}</TableHead>
            <TableHead>{t("table.customer")}</TableHead>
            <TableHead>{t("table.date")}</TableHead>
            <TableHead>{t("table.status")}</TableHead>
            <TableHead className="text-end">{t("table.items")}</TableHead>
            <TableHead className="text-end">{t("table.total")}</TableHead>
            <TableHead className="w-12 text-end">
              <span className="sr-only">{t("table.actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections.map((section) => (
            <OrdersTableSectionRows key={section.key} section={section} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function OrdersTableSectionRows({
  section,
}: {
  section: OrderListDisplaySection;
}) {
  return (
    <>
      <TableRow className="bg-muted/40 hover:bg-muted/40">
        <TableCell
          colSpan={TABLE_COLUMN_COUNT}
          className="py-2 font-medium text-muted-foreground text-sm"
        >
          {section.title}
        </TableCell>
      </TableRow>
      {section.orders.map((order) => (
        <OrdersTableRow key={order.id} order={order} />
      ))}
    </>
  );
}

function OrdersTableRow({ order }: { order: OrderListItemOutput }) {
  const router = useRouter();
  const t = useTranslations("orders.list");
  const formatPrice = useFormatPriceForActiveStore();
  const { total, itemsCount, badgeVariant, statusLabel, formattedDate } =
    useOrderListItemView(order);

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(RoutePaths.ORDERS.DETAIL.url(order.id))}
    >
      <TableCell className="font-medium">#{order.id}</TableCell>
      <TableCell className="max-w-xs whitespace-normal">
        <p className="line-clamp-1 font-medium text-foreground/90">
          {order.customer?.name ?? "—"}
        </p>
      </TableCell>
      <TableCell className="text-muted-foreground">{formattedDate}</TableCell>
      <TableCell>
        <Badge variant={badgeVariant} className="font-normal">
          {statusLabel}
        </Badge>
      </TableCell>
      <TableCell className="text-end text-muted-foreground">
        {t("itemsCount", { count: itemsCount })}
      </TableCell>
      <TableCell className="text-end font-medium">
        {formatPrice(total)}
      </TableCell>
      <TableCell
        className="text-end"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={t("viewOrder", { id: order.id })}
          onClick={() => router.push(RoutePaths.ORDERS.DETAIL.url(order.id))}
        >
          <Icons.chevronRight className="size-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
