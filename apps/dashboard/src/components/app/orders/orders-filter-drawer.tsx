"use client";

import type { OrderStatus } from "@dukkani/common/schemas/order/enums";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Field, FieldLabel } from "@dukkani/ui/components/field";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface DateRange {
	from: Date | null;
	to: Date | null;
}

type StatusFilter = OrderStatus | null;

interface OrdersFilterDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	status: StatusFilter;
	dateRange: DateRange;
	setStatus: (value: StatusFilter) => void;
	setDateRange: (range: DateRange) => void;
	resetFilters: () => void;
}

const STATUS_OPTIONS = [
	{ value: null as StatusFilter, key: "all" as const },
	{ value: "PENDING" as OrderStatus, key: "pending" as const },
	{ value: "CONFIRMED" as OrderStatus, key: "confirmed" as const },
	{ value: "SHIPPED" as OrderStatus, key: "shipped" as const },
	{ value: "DELIVERED" as OrderStatus, key: "delivered" as const },
] satisfies {
	value: StatusFilter;
	key: "all" | "pending" | "confirmed" | "shipped" | "delivered";
}[];

function toDateString(date: Date | null): string {
	return date ? date.toISOString().slice(0, 10) : "";
}

function parseDateString(str: string): Date | null {
	if (!str.trim()) return null;
	const d = new Date(str);
	return Number.isNaN(d.getTime()) ? null : d;
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

	const [draftStatus, setDraftStatus] = useState<StatusFilter>(status);
	const [draftFrom, setDraftFrom] = useState(toDateString(dateRange.from));
	const [draftTo, setDraftTo] = useState(toDateString(dateRange.to));

	useEffect(() => {
		if (open) {
			setDraftStatus(status);
			setDraftFrom(toDateString(dateRange.from));
			setDraftTo(toDateString(dateRange.to));
		}
	}, [open, status, dateRange.from, dateRange.to]);

	const handleApply = () => {
		setStatus(draftStatus);
		setDateRange({
			from: parseDateString(draftFrom),
			to: parseDateString(draftTo),
		});
		onOpenChange(false);
	};

	const handleClearAll = () => {
		setDraftStatus(null);
		setDraftFrom("");
		setDraftTo("");
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
							{STATUS_OPTIONS.map((opt) => {
								const isActive = draftStatus === opt.value;
								return (
									<Button
										key={opt.key}
										variant={isActive ? "default" : "outline"}
										size="sm"
										onClick={() => setDraftStatus(opt.value)}
									>
										{tFilters(opt.key)}
									</Button>
								);
							})}
						</div>
					</div>

					{/* Date range */}
					<div className="space-y-2">
						<p className="font-medium text-sm">{t("dateRange")}</p>
						<div className="flex gap-3">
							<Field className="flex-1">
								<FieldLabel>{t("from")}</FieldLabel>
								<Input
									type="date"
									value={draftFrom}
									onChange={(e) => setDraftFrom(e.target.value)}
								/>
							</Field>
							<Field className="flex-1">
								<FieldLabel>{t("to")}</FieldLabel>
								<Input
									type="date"
									value={draftTo}
									onChange={(e) => setDraftTo(e.target.value)}
								/>
							</Field>
						</div>
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
