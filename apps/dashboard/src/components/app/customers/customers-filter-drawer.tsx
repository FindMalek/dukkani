"use client";

import type { CustomerSort } from "@dukkani/common/schemas/customer/input";
import type { GovernorateInfer } from "@dukkani/common/schemas/enums";
import { Button } from "@dukkani/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Label } from "@dukkani/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const SORT_OPTIONS: CustomerSort[] = [
  "recent",
  "orderCount",
  "totalSpent",
  "lastOrderAt",
];

interface CustomersFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  governorates: GovernorateInfer[];
  counts: { governorate: GovernorateInfer; count: number }[];
  sortBy: CustomerSort;
  setGovernorates: (value: GovernorateInfer[]) => void;
  setSortBy: (value: CustomerSort) => void;
  resetFilters: () => void;
}

export function CustomersFilterDrawer({
  open,
  onOpenChange,
  governorates,
  counts,
  sortBy,
  setGovernorates,
  setSortBy,
  resetFilters,
}: CustomersFilterDrawerProps) {
  const t = useTranslations("customers.list.filterDrawer");
  const tGov = useTranslations("customers.list.governorates");

  const [draftGovernorates, setDraftGovernorates] =
    useState<GovernorateInfer[]>(governorates);
  const [draftSortBy, setDraftSortBy] = useState<CustomerSort>(sortBy);

  // Governorates with zero customers are excluded from `counts` (the query
  // GROUPs BY governorate, so empty ones never appear). If a governorate was
  // selected before its last customer was removed/moved, it may no longer be
  // in `counts` — keep it visible as an option (don't silently drop the
  // merchant's active filter) but don't offer it as a brand-new option beyond
  // that. We source the extra governorates from the applied `governorates`
  // prop (not `draftGovernorates`): the prop only changes on "Apply", so a
  // mid-interaction deselect of a zero-count governorate keeps its button
  // visible (inactive) instead of vanishing before the user confirms.
  const governorateOptions = useMemo(() => {
    const options = counts.map(({ governorate, count }) => ({
      governorate,
      count: count as number | undefined,
    }));
    for (const governorate of governorates) {
      if (!counts.some((c) => c.governorate === governorate)) {
        options.push({ governorate, count: undefined });
      }
    }
    return options;
  }, [counts, governorates]);

  useEffect(() => {
    if (open) {
      setDraftGovernorates(governorates);
      setDraftSortBy(sortBy);
    }
  }, [open, governorates, sortBy]);

  const toggleDraftGovernorate = (governorate: GovernorateInfer) => {
    setDraftGovernorates((prev) =>
      prev.includes(governorate)
        ? prev.filter((g) => g !== governorate)
        : [...prev, governorate],
    );
  };

  const handleApply = () => {
    setGovernorates(draftGovernorates);
    setSortBy(draftSortBy);
    onOpenChange(false);
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
            onClick={resetFilters}
          >
            {t("clearAll")}
          </Button>
        </DrawerHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
          <div className="space-y-2">
            <p className="font-medium text-sm">{t("governorate")}</p>
            <div className="flex flex-wrap gap-2">
              {governorateOptions.map(({ governorate, count }) => {
                const isActive = draftGovernorates.includes(governorate);
                return (
                  <Button
                    key={governorate}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDraftGovernorate(governorate)}
                  >
                    {tGov(governorate)}
                    {count !== undefined && (
                      <span className="ms-1 font-bold">{count}</span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-sm">{t("sortBy")}</p>
            <RadioGroup
              value={draftSortBy}
              onValueChange={(v) => setDraftSortBy(v as CustomerSort)}
            >
              {SORT_OPTIONS.map((option) => (
                <div key={option} className="flex items-center gap-3">
                  <RadioGroupItem value={option} id={`sort-${option}`} />
                  <Label htmlFor={`sort-${option}`} className="font-normal">
                    {t(`sortOptions.${option}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DrawerFooter className="flex flex-row gap-2">
          <Button onClick={handleApply}>{t("apply")}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
