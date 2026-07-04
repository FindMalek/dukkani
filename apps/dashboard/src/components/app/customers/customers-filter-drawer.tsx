"use client";

import { LIST_GOVERNORATES } from "@dukkani/common/schemas/enums";
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
import { useEffect, useState } from "react";

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
  sortBy: CustomerSort;
  setGovernorates: (value: GovernorateInfer[]) => void;
  setSortBy: (value: CustomerSort) => void;
  resetFilters: () => void;
}

export function CustomersFilterDrawer({
  open,
  onOpenChange,
  governorates,
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
              {LIST_GOVERNORATES.map((governorate) => {
                const isActive = draftGovernorates.includes(governorate);
                return (
                  <Button
                    key={governorate}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDraftGovernorate(governorate)}
                  >
                    {tGov(governorate)}
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
          <Button onClick={handleApply} className="w-full">
            {t("apply")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
