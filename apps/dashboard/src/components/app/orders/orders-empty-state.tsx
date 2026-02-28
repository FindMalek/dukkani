"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

export function OrdersEmptyState() {
	const t = useTranslations("orders.list");

	return (
		<div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-16 text-center">
			<div className="mb-4 rounded-full bg-muted p-4">
				<Icons.shoppingCart className="size-8 text-muted-foreground" />
			</div>
			<p className="text-muted-foreground text-sm">{t("empty")}</p>
		</div>
	);
}
