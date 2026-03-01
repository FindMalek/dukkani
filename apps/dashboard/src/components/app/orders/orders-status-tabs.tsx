"use client";

import {
	OrderEntity,
	type OrderStatusFilter,
} from "@dukkani/common/entities/order/entity";
import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";

interface OrdersStatusTabsProps {
	value: OrderStatusFilter;
	onChange: (value: OrderStatusFilter) => void;
}

export function OrdersStatusTabs({ value, onChange }: OrdersStatusTabsProps) {
	const t = useTranslations("orders.list.filters");
	const options = OrderEntity.getStatusFilterOptions();

	return (
		<div className="flex gap-2 overflow-x-auto">
			{options.map((opt) => {
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
