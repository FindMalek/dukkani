"use client";

import {
	PUBLISHED_FILTER_OPTIONS,
	type PublishedFilter,
} from "@dukkani/common/schemas/product/enums";
import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";

interface ProductsStatusTabsProps {
	value: PublishedFilter;
	onChange: (value: PublishedFilter) => void;
}

export function ProductsStatusTabs({
	value,
	onChange,
}: ProductsStatusTabsProps) {
	const t = useTranslations("products.list.filters");

	return (
		<div className="flex gap-2 overflow-x-auto">
			{PUBLISHED_FILTER_OPTIONS.map((opt) => {
				const isActive = value === opt.value;
				return (
					<Button
						key={opt.labelKey}
						variant={isActive ? "default" : "ghost"}
						onClick={() => onChange(opt.value)}
					>
						{t(opt.labelKey)}
					</Button>
				);
			})}
		</div>
	);
}
