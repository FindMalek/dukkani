"use client";

import { Icons } from "@dukkani/ui/components/icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@dukkani/ui/components/input-group";
import { useTranslations } from "next-intl";

interface OrdersSearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onFilterClick?: () => void;
	filterActive?: boolean;
}

export function OrdersSearchBar({
	value,
	onChange,
	onFilterClick,
	filterActive = false,
}: OrdersSearchBarProps) {
	const t = useTranslations("orders.list");

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
