"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";

export function ProductsEmptyState() {
	const t = useTranslations("products.list");
	const locale = useLocale();
	const newProductHref = `/${locale}${RoutePaths.PRODUCTS.NEW.url}`;

	return (
		<div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-16 text-center">
			<div className="mb-4 rounded-full bg-muted p-4">
				<Icons.package className="size-8 text-muted-foreground" />
			</div>
			<p className="text-muted-foreground text-sm">{t("empty")}</p>
			<Button asChild className="mt-6" size="lg">
				<Link href={newProductHref}>{t("addProduct")}</Link>
			</Button>
		</div>
	);
}
