"use client";

import type { OrderStatus } from "@dukkani/common/schemas/order/enums";
import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";

type StatusFilter = OrderStatus | null;

interface OrdersStatusTabsProps {
	value: StatusFilter;
	onChange: (value: StatusFilter) => void;
}

const TABS = [
	{ value: null as StatusFilter, key: "all" as const },
	{ value: "PENDING" as OrderStatus, key: "pending" as const },
	{ value: "CONFIRMED" as OrderStatus, key: "confirmed" as const },
	{ value: "SHIPPED" as OrderStatus, key: "shipped" as const },
	{ value: "DELIVERED" as OrderStatus, key: "delivered" as const },
] satisfies {
	value: StatusFilter;
	key: "all" | "pending" | "confirmed" | "shipped" | "delivered";
}[];

export function OrdersStatusTabs({ value, onChange }: OrdersStatusTabsProps) {
	const t = useTranslations("orders.list.filters");

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
