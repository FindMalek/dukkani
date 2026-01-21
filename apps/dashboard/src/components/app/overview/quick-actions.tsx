"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { QuickActionButton } from "@dukkani/ui/components/quick-action-button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function QuickActions() {
	const t = useTranslations("dashboard.overview.quickActions");
	const router = useRouter();

	return (
		<div className="space-y-4">
			<h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
				{t("title")}
			</h2>
			<div className="space-y-3">
				<QuickActionButton
					variant="primary"
					icon={Icons.plus}
					onClick={() => router.push("/products/new")}
				>
					{t("addProduct")}
				</QuickActionButton>
				<QuickActionButton
					variant="outline"
					icon={Icons.package}
					onClick={() => router.push("/orders")}
				>
					{t("viewOrders")}
				</QuickActionButton>
			</div>
		</div>
	);
}
