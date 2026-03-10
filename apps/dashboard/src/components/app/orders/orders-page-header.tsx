"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

interface OrdersPageHeaderProps {
	onRefresh?: () => void;
	isRefetching?: boolean;
}

export function OrdersPageHeader({
	onRefresh,
	isRefetching = false,
}: OrdersPageHeaderProps) {
	const t = useTranslations("orders.list");

	return (
		<div className="mb-6 flex items-start justify-between gap-4">
			<div>
				<h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
				<p className="mt-2 text-muted-foreground text-sm md:text-base">
					{t("description")}
				</p>
			</div>
			{onRefresh && (
				<Button
					variant="ghost"
					size="icon"
					onClick={onRefresh}
					disabled={isRefetching}
					aria-label={t("refresh")}
				>
					<Icons.refreshCw
						className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
					/>
				</Button>
			)}
		</div>
	);
}
