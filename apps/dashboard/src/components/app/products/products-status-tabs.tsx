"use client";

import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";

type PublishedFilter = boolean | null;

interface ProductsStatusTabsProps {
	value: PublishedFilter;
	onChange: (value: PublishedFilter) => void;
}

const TABS = [
	{ value: null as PublishedFilter, key: "all" as const },
	{ value: true as PublishedFilter, key: "published" as const },
	{ value: false as PublishedFilter, key: "draft" as const },
] satisfies { value: PublishedFilter; key: "all" | "published" | "draft" }[];

export function ProductsStatusTabs({
	value,
	onChange,
}: ProductsStatusTabsProps) {
	const t = useTranslations("products.list.filters");

	return (
		<div className="flex gap-2 overflow-x-auto">
			{TABS.map((tab) => {
				const isActive = value === tab.value;
				return (
					<Button
						key={tab.key}
						variant={isActive ? "default" : "ghost"}
						onClick={() => onChange(tab.value)}
					>
						{t(tab.key)}
					</Button>
				);
			})}
		</div>
	);
}
