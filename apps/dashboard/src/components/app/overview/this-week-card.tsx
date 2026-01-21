"use client";

import type { DashboardStatsOutput } from "@dukkani/common/schemas/dashboard/output";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { useTranslations } from "next-intl";

interface ThisWeekCardProps {
	stats: DashboardStatsOutput;
}

export function ThisWeekCard({ stats }: ThisWeekCardProps) {
	const t = useTranslations("dashboard.overview.thisWeek");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-medium text-muted-foreground text-sm">
					{t("title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl">
					{stats.weekOrders} {t("orders")}
				</div>
			</CardContent>
		</Card>
	);
}
