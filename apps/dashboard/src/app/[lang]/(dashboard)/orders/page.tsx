"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@dukkani/ui/components/alert";
import { Button } from "@dukkani/ui/components/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@dukkani/ui/components/empty";
import { Icons } from "@dukkani/ui/components/icons";
import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { OrdersFilterDrawer } from "@/components/app/orders/orders-filter-drawer";
import { OrdersGroupedList } from "@/components/app/orders/orders-grouped-list";
import { OrdersListSkeleton } from "@/components/app/orders/orders-list-skeleton";
import { OrdersPageHeader } from "@/components/app/orders/orders-page-header";
import { OrdersSearchBar } from "@/components/app/orders/orders-search-bar";
import { OrdersStatusTabs } from "@/components/app/orders/orders-status-tabs";
import { useOrdersController } from "@/shared/lib/order/controller.hook";
import {
  getOrderListDisplaySections,
  groupOrdersByDate,
} from "@/shared/lib/order/order.util";

export default function OrdersPage() {
  const locale = useLocale();
  const t = useTranslations("orders.list");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    ordersQuery: { data, isLoading, error, refetch, isRefetching },
    search,
    status,
    setSearch,
    setStatus,
    resetFilters,
  } = useOrdersController();

  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const filterActive =
    status !== null || dateRange.from !== null || dateRange.to !== null;

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl p-4 pb-24 md:p-6 md:pb-8">
        <OrdersPageHeader />
        <Alert className="mt-4" variant="destructive">
          <Icons.alertTriangle />
          <AlertTitle>{t("error")}</AlertTitle>
          <AlertDescription className="col-start-2 flex sm:justify-end">
            <Button
              className="shrink-0"
              size="sm"
              type="button"
              variant="outline"
              onClick={() => void refetch()}
            >
              {t("retry")}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const grouped = data?.orders
    ? groupOrdersByDate(data.orders, { locale })
    : null;
  const sections = grouped
    ? getOrderListDisplaySections(grouped, {
        today: t("today"),
        yesterday: t("yesterday"),
      })
    : [];

  let listBody: ReactNode;
  if (isLoading) {
    listBody = <OrdersListSkeleton />;
  } else if (!data?.orders?.length) {
    listBody = (
      <Empty className="border bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icons.shoppingCart />
          </EmptyMedia>
          <EmptyDescription>{t("empty")}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  } else {
    listBody = <OrdersGroupedList sections={sections} />;
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 pb-24 md:p-6 md:pb-8">
      <OrdersPageHeader
        isRefetching={isRefetching}
        onRefresh={() => refetch()}
      />

      <div className="mb-6 space-y-4">
        <OrdersSearchBar
          value={search}
          onChange={setSearch}
          onFilterClick={() => setFilterDrawerOpen(true)}
          filterActive={filterActive}
        />
        <OrdersStatusTabs value={status} onChange={setStatus} />
      </div>

      <OrdersFilterDrawer
        open={filterDrawerOpen}
        onOpenChange={setFilterDrawerOpen}
        status={status}
        dateRange={dateRange}
        setStatus={setStatus}
        setDateRange={setDateRange}
        resetFilters={resetFilters}
      />

      {listBody}
    </div>
  );
}
