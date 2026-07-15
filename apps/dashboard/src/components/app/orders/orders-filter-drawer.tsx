"use client";

import {
  OrderEntity,
  type OrderStatusFilter,
} from "@dukkani/common/entities/order/entity";
import { Button } from "@dukkani/ui/components/button";
import { DateRangePicker } from "@dukkani/ui/components/date-range-picker";
import {
  ResponsivePopover,
  ResponsivePopoverContent,
  ResponsivePopoverTrigger,
} from "@dukkani/ui/components/responsive-popover";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface OrdersFilterDrawerProps {
  trigger: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: OrderStatusFilter;
  dateRange: DateRange;
  setStatus: (value: OrderStatusFilter) => void;
  setDateRange: (range: DateRange) => void;
  resetFilters: () => void;
}

export function OrdersFilterDrawer({
  trigger,
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
    <ResponsivePopover open={open} onOpenChange={onOpenChange}>
      <ResponsivePopoverTrigger asChild>{trigger}</ResponsivePopoverTrigger>
      <ResponsivePopoverContent className="w-full xl:w-96 xl:max-w-md">
        <div className="flex flex-row items-center justify-between border-b p-4">
          <p className="font-semibold text-foreground">{t("title")}</p>
          <Button
            variant="ghost"
            size="sm"
            className="-me-2 text-muted-foreground"
            onClick={handleClearAll}
          >
            {t("clearAll")}
          </Button>
        </div>

        <div className="flex max-h-[60vh] flex-1 flex-col gap-6 overflow-y-auto px-4 py-4">
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

        <div className="flex flex-row gap-2 border-t p-4">
          <Button onClick={handleApply} className="w-full">
            {t("apply")}
          </Button>
        </div>
      </ResponsivePopoverContent>
    </ResponsivePopover>
  );
}
