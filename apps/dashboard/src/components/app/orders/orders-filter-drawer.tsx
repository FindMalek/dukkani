"use client";

import {
	OrderEntity,
	type OrderStatusFilter,
} from "@dukkani/common/entities/order/entity";
import { Button } from "@dukkani/ui/components/button";
import { DateRangePicker } from "@dukkani/ui/components/date-range-picker";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface DateRange {
	from: Date | null;
	to: Date | null;
}

interface OrdersFilterDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	status: OrderStatusFilter;
	dateRange: DateRange;
	setStatus: (value: OrderStatusFilter) => void;
	setDateRange: (range: DateRange) => void;
	resetFilters: () => void;
}

export function OrdersFilterDrawer({
	open,
	onOpenChange,
	status,
	dateRange,
	setStatus,
	setDateRange,
	resetFilters,
}: OrdersFilterDrawerProps) {
	const t = useTranslations("orders.list.filterDrawer");
	const tFilters = useTranslations("orders.list.filters");

	const [draftStatus, setDraftStatus] = useState<OrderStatusFilter>(status);
	const [draftDateRange, setDraftDateRange] = useState<DateRange>(dateRange);

	useEffect(() => {
		if (open) {
		  setDraftStatus(status);
		  setDraftDateRange(dateRange);
		}
	  }, [open, status, dateRange]);

	const handleApply = () => {
		setStatus(draftStatus);
		setDateRange(draftDateRange);
		onOpenChange(false);
	};

	const handleClearAll = () => {
		resetFilters();
	  };

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="max-h-[85vh]">
				<DrawerHeader className="flex flex-row items-center justify-between">
					<DrawerTitle>{t("title")}</DrawerTitle>
					<Button
						variant="ghost"
						size="sm"
						className="-me-2 text-muted-foreground"
						onClick={handleClearAll}
					>
						{t("clearAll")}
					</Button>
				</DrawerHeader>

				<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
					{/* Status */}
					<div className="space-y-2">
						<p className="font-medium text-sm">{t("status")}</p>
						<div className="flex flex-wrap gap-2">
							{OrderEntity.getStatusFilterOptions().map((opt) => {
								const isActive = draftStatus === opt.value;
								return (
									<Button
										key={opt.labelKey}
										variant={isActive ? "default" : "outline"}
										size="sm"
										onClick={() => setDraftStatus(opt.value)}
									>
										{tFilters(opt.labelKey)}
									</Button>
								);
							})}
						</div>
					</div>

					{/* Date range */}
					<div className="space-y-2">
						<DateRangePicker
							value={draftDateRange}
							onChange={setDraftDateRange}
							label={t("dateRange")}
							placeholder={t("pickDateRange")}
							numberOfMonths={1}
						/>
					</div>
				</div>

				<DrawerFooter className="flex flex-row gap-2">
					<Button onClick={handleApply} className="w-full">
						{t("apply")}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
