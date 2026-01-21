"use client";

import type { DashboardStatsOutput } from "@dukkani/common/schemas/dashboard/output";
import { formatCurrency } from "@dukkani/common/utils";
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
			<div className="grid gap-4 md:grid-cols-2">
				<StatCard
					title={t("orders")}
					value={stats.todayOrders}
					change={stats.todayOrdersChange}
				/>
				<StatCard
					title={t("revenue")}
					value={formatCurrency(stats.todayRevenue)}
				/>
			</div>
		</div>
	);
}
