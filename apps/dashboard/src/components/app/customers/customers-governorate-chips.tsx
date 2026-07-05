"use client";

import type { GovernorateInfer } from "@dukkani/common/schemas/enums";
import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";

interface CustomersGovernorateChipsProps {
  counts: { governorate: GovernorateInfer; count: number }[];
  totalCount: number;
  selected: GovernorateInfer[];
  onToggle: (governorate: GovernorateInfer) => void;
  onClear: () => void;
}

export function CustomersGovernorateChips({
  counts,
  totalCount,
  selected,
  onToggle,
  onClear,
}: CustomersGovernorateChipsProps) {
  const t = useTranslations("customers.list.governorates");

  if (counts.length === 0) return null;

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      <Button
        variant={selected.length === 0 ? "default" : "outline"}
        size="sm"
        className="shrink-0 rounded-full"
        onClick={onClear}
      >
        {t("all")} <span className="ms-1 font-bold">{totalCount}</span>
      </Button>
      {counts.map(({ governorate, count }) => {
        const isActive = selected.includes(governorate);
        return (
          <Button
            key={governorate}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => onToggle(governorate)}
          >
            {t(governorate)} <span className="ms-1 font-bold">{count}</span>
          </Button>
        );
      })}
    </div>
  );
}
