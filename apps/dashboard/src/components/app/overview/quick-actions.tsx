"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { QuickActionButton } from "@dukkani/ui/components/quick-action-button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getRouteHref } from "@/lib/routes";

export function QuickActions() {
	const t = useTranslations("dashboard.overview.quickActions");

	return (
		<div className="space-y-4">
			<h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
				{t("title")}
			</h2>
			<div className="space-y-3">
				<QuickActionButton variant="primary" icon={Icons.plus} asChild>
					<Link href={getRouteHref("PRODUCTS", "NEW")}>{t("addProduct")}</Link>
				</QuickActionButton>
				<QuickActionButton variant="outline" icon={Icons.package} asChild>
					<Link href={getRouteHref("ORDERS", "INDEX")}>{t("viewOrders")}</Link>
				</QuickActionButton>
			</div>
		</div>
	);
}
