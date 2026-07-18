"use client";

import type { CustomerListItemOutput } from "@dukkani/common/schemas/customer/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { FlagComponent, getPhoneCountry } from "@dukkani/ui/components/country";
import { Icons } from "@dukkani/ui/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dukkani/ui/components/table";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCopyToClipboard } from "@/shared/lib/clipboard";
import { RoutePaths } from "@/shared/config/routes";
import { useCustomerListItemView } from "@/shared/lib/customer/list-item-view.hook";

interface CustomersTableProps {
  customers: CustomerListItemOutput[];
  selectionMode: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
}

/**
 * Desktop (>=1280px / `xl:`) table presentation of the customers list.
 *
 * Mirrors the data already surfaced by {@link CustomerListCard} — same
 * fields, same navigation target — just laid out for wide screens.
 * `customers-list-selection-bar`'s bulk actions carry over via a checkbox
 * column, shown only while `selectionMode` is active (matching the card's
 * behavior) plus a header "select all" checkbox for the currently visible
 * page. Filtering, search, sorting and pagination all stay owned by
 * `useCustomersController`; this component is presentation only.
 */
export function CustomersTable({
  customers,
  selectionMode,
  selectedIds,
  onToggleSelect,
}: CustomersTableProps) {
  const t = useTranslations("customers.list");

  const allIds = customers.map((c) => c.id);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.has(id));

  const handleToggleAll = () => {
    for (const id of allIds) {
      if (allSelected ? selectedIds.has(id) : !selectedIds.has(id)) {
        onToggleSelect(id);
      }
    }
  };

  return (
    <div className="hidden rounded-lg border xl:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {selectionMode && (
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleToggleAll}
                  aria-label={t("selectAll")}
                />
              </TableHead>
            )}
            <TableHead>{t("table.name")}</TableHead>
            <TableHead>{t("table.contact")}</TableHead>
            <TableHead>{t("table.governorate")}</TableHead>
            <TableHead className="text-end">{t("table.orderCount")}</TableHead>
            <TableHead className="text-end">{t("table.totalSpent")}</TableHead>
            <TableHead>{t("table.lastOrder")}</TableHead>
            <TableHead className="w-12 text-end">
              <span className="sr-only">{t("table.actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <CustomersTableRow
              key={customer.id}
              customer={customer}
              selectionMode={selectionMode}
              selected={selectedIds.has(customer.id)}
              onToggleSelect={() => onToggleSelect(customer.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface CustomersTableRowProps {
  customer: CustomerListItemOutput;
  selectionMode: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}

function CustomersTableRow({
  customer,
  selectionMode,
  selected,
  onToggleSelect,
}: CustomersTableRowProps) {
  const router = useRouter();
  const t = useTranslations("customers.list");
  const { totalSpentLabel, lastOrderLabel, governorateLabel } =
    useCustomerListItemView(customer);
  const { copy } = useCopyToClipboard();

  const handleRowClick = () => {
    if (selectionMode) {
      onToggleSelect();
      return;
    }
    router.push(RoutePaths.CUSTOMERS.DETAIL.url(customer.id));
  };

  return (
    <TableRow className="cursor-pointer" onClick={handleRowClick}>
      {selectionMode && (
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selected}
            onCheckedChange={onToggleSelect}
            aria-label={customer.name}
          />
        </TableCell>
      )}
      <TableCell className="max-w-xs whitespace-normal">
        <p
          className="line-clamp-1 font-medium text-foreground/90"
          title={customer.name}
        >
          {customer.name}
        </p>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => copy(customer.phone, t("phoneCopied"))}
          className="flex cursor-pointer items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground hover:underline"
        >
          <FlagComponent
            country={getPhoneCountry(customer.phone)}
            countryName={customer.phone}
          />
          {customer.phone}
        </button>
      </TableCell>
      <TableCell>
        {governorateLabel ? (
          <Badge variant="outline" className="font-normal">
            {governorateLabel}
          </Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="text-end text-muted-foreground">
        {customer.orderCount}
      </TableCell>
      <TableCell className="text-end font-medium">{totalSpentLabel}</TableCell>
      <TableCell className="text-muted-foreground">
        {lastOrderLabel || "—"}
      </TableCell>
      <TableCell
        className="text-end"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label={t("viewCustomer", { name: customer.name })}
          onClick={() =>
            router.push(RoutePaths.CUSTOMERS.DETAIL.url(customer.id))
          }
        >
          <Icons.chevronRight className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
