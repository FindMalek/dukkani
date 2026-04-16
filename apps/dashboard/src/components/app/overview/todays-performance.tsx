"use client";

import type { DashboardStatsOutput } from "@dukkani/common/schemas/dashboard/output";
import { useT } from "next-i18next/client";
import { OrdersCard } from "@/components/shared/orders-card";
import { RevenueCard } from "@/components/shared/revenue-card";

interface TodaysPerformanceProps {
  stats: DashboardStatsOutput;
}

export function TodaysPerformance({ stats }: TodaysPerformanceProps) {
  const { t } = useT("pages", {
    keyPrefix: "dashboard.overview.todaysPerformance",
  });

  return (
    <div className="space-y-4">
      <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <OrdersCard
          title={t("orders")}
          value={stats.todayOrders}
          change={stats.todayOrdersChange}
        />
        <RevenueCard title={t("revenue")} value={stats.todayRevenue} />
      </div>
    </div>
  );
}
