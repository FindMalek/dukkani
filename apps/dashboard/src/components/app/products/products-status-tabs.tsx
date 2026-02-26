"use client";

import { cn } from "@dukkani/ui/lib/utils";
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
					<button
						key={tab.key}
						type="button"
						onClick={() => onChange(tab.value)}
						className={cn(
							"shrink-0 rounded-full px-4 py-2 font-medium text-sm transition-colors",
							isActive
								? "bg-primary text-primary-foreground"
								: "bg-muted text-muted-foreground hover:bg-muted/80",
						)}
					>
						{t(tab.key)}
					</button>
				);
			})}
		</div>
	);
}
