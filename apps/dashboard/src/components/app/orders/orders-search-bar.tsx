"use client";

import { Icons } from "@dukkani/ui/components/icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@dukkani/ui/components/input-group";
import { useTranslations } from "next-intl";

interface OrdersSearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function OrdersSearchBar({ value, onChange }: OrdersSearchBarProps) {
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
		</InputGroup>
	);
}
