"use client";

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@dukkani/ui/components/input-group";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

interface ProductsSearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onFilterClick?: () => void;
	filterActive?: boolean;
}

export function ProductsSearchBar({
	value,
	onChange,
	onFilterClick,
	filterActive = false,
}: ProductsSearchBarProps) {
	const t = useTranslations("products.list");

	return (
		<InputGroup>
			<InputGroupInput
				type="search"
				placeholder={t("searchPlaceholder")}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-label={t("searchPlaceholder")}
			/>
			<InputGroupAddon align="inline-start">
				<Icons.search className="text-muted-foreground" />
			</InputGroupAddon>
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					type="button"
					variant={filterActive ? "default" : "ghost"}
					size="icon-sm"
					onClick={onFilterClick}
					aria-label={t("filterDrawer.title")}
				>
					<Icons.slidersHorizontal className="size-4" />
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
