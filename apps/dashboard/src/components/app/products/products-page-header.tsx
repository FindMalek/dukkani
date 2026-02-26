"use client";

import { useTranslations } from "next-intl";

export function ProductsPageHeader() {
	const t = useTranslations("products.list");

	return (
		<div className="mb-6">
			<h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
			<p className="mt-2 text-muted-foreground text-sm md:text-base">
				{t("description")}
			</p>
		</div>
	);
}
