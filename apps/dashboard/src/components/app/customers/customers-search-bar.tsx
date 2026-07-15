"use client";

import { Icons } from "@dukkani/ui/components/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@dukkani/ui/components/input-group";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

interface CustomersSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  /** The filter trigger + popover/drawer, e.g. `<CustomersFilterDrawer trigger={...} .../>`. */
  filterTrigger?: ReactNode;
}

export function CustomersSearchBar({
  value,
  onChange,
  filterTrigger,
}: CustomersSearchBarProps) {
  const t = useTranslations("customers.list");

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
      <InputGroupAddon align="inline-end">{filterTrigger}</InputGroupAddon>
    </InputGroup>
  );
}
