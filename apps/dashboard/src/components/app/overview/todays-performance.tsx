"use client";

import type { DashboardStatsOutput } from "@dukkani/common/schemas/dashboard/output";
import { StatCard } from "@dukkani/ui/components/stat-card";
import { useTranslations } from "next-intl";

interface TodaysPerformanceProps {
	stats: DashboardStatsOutput;
}

export function TodaysPerformance({ stats }: TodaysPerformanceProps) {
	const t = useTranslations("dashboard.overview.todaysPerformance");

	return (
		<div className="space-y-4">
			<h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
				{t("title")}
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<StatCard
					title={t("orders")}
					value={stats.todayOrders}
					change={stats.todayOrdersChange}
				/>
				<StatCard
					title={t("revenue")}
					value={stats.todayRevenue}
					currency="TND"
				/>
			</div>
		</div>
	);
}
