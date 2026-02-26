"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";

interface ProductsSearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function ProductsSearchBar({ value, onChange }: ProductsSearchBarProps) {
	const t = useTranslations("products.list");

	return (
		<div className="relative">
			<Icons.search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="search"
				placeholder={t("searchPlaceholder")}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="ps-9"
				aria-label={t("searchPlaceholder")}
			/>
		</div>
	);
}
