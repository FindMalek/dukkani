"use client";

import type { StoreStatsOutput } from "@dukkani/common/schemas/store/output";
import { useTranslations } from "next-intl";
import { MetricCard } from "@/components/shared/metric-card";
import { OrdersCard } from "@/components/shared/orders-card";
import { RevenueCard } from "@/components/shared/revenue-card";

interface PerformanceOverviewProps {
  stats: StoreStatsOutput;
}

export function PerformanceOverview({ stats }: PerformanceOverviewProps) {
  const t = useTranslations("dashboard.overview.todaysPerformance");
  const tWeek = useTranslations("dashboard.overview.thisWeek");

  return (
    <div className="space-y-4">
      <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <OrdersCard
          title={t("orders")}
          value={stats.todayOrders}
          change={stats.todayOrdersChange}
        />
        <RevenueCard title={t("revenue")} value={stats.todayRevenue} />
        <MetricCard
          className="col-span-2 xl:col-span-1"
          title={tWeek("title")}
          value={
            <div className="font-bold text-3xl text-foreground">
              {stats.weekOrders}{" "}
              <span className="font-normal text-base text-muted-foreground">
                {tWeek("orders")}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
