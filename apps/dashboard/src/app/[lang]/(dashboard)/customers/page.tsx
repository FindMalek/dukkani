"use client";

import { Button } from "@dukkani/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@dukkani/ui/components/empty";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CustomerListCard } from "@/components/app/customers/customer-list-card";
import { CustomersFilterDrawer } from "@/components/app/customers/customers-filter-drawer";
import { CustomersGovernorateChips } from "@/components/app/customers/customers-governorate-chips";
import { CustomersListSelectionBar } from "@/components/app/customers/customers-list-selection-bar";
import { CustomersListSkeleton } from "@/components/app/customers/customers-list-skeleton";
import { CustomersPageHeader } from "@/components/app/customers/customers-page-header";
import { CustomersSearchBar } from "@/components/app/customers/customers-search-bar";
import { RoutePaths } from "@/shared/config/routes";
import { useCustomersController } from "@/shared/lib/customer/controller.hook";

export default function CustomersPage() {
  const t = useTranslations("customers.list");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    customersQuery: { data, isLoading, error },
    governorateCountsQuery: { data: governorateCountsData },
    search,
    governorates,
    sortBy,
    page,
    setSearch,
    toggleGovernorate,
    setGovernorates,
    setSortBy,
    setPage,
    resetFilters,
    selection,
  } = useCustomersController();

  const filterActive = governorates.length > 0 || sortBy !== "recent";
  const customers = data?.customers ?? [];
  const selectedCustomers = customers.filter((c) => selection.selectedIds.has(c.id));
  const hasNextPage = data?.hasMore ?? false;

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl p-4 pb-24 md:p-6 md:pb-8">
        <CustomersPageHeader
          selectionActive={selection.active}
          onToggleSelection={selection.active ? selection.exit : selection.enter}
        />
        <p className="text-destructive text-sm">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 pb-24 md:p-6 md:pb-8">
      <CustomersPageHeader
        selectionActive={selection.active}
        onToggleSelection={() =>
          selection.active ? selection.exit() : selection.enter()
        }
      />

      <div className="mb-4 space-y-4">
        <CustomersSearchBar
          value={search}
          onChange={setSearch}
          onFilterClick={() => setFilterDrawerOpen(true)}
          filterActive={filterActive}
        />
        <CustomersGovernorateChips
          counts={governorateCountsData?.counts ?? []}
          totalCount={data?.total ?? 0}
          selected={governorates}
          onToggle={toggleGovernorate}
          onClear={() => resetFilters()}
        />
      </div>

      <CustomersFilterDrawer
        open={filterDrawerOpen}
        onOpenChange={setFilterDrawerOpen}
        governorates={governorates}
        sortBy={sortBy}
        setGovernorates={setGovernorates}
        setSortBy={setSortBy}
        resetFilters={resetFilters}
      />

      {isLoading ? (
        <CustomersListSkeleton />
      ) : customers.length > 0 ? (
        <div className="space-y-3">
          {customers.map((customer) => (
            <CustomerListCard
              key={customer.id}
              customer={customer}
              selectionMode={selection.active}
              selected={selection.selectedIds.has(customer.id)}
              onToggleSelect={() => selection.toggle(customer.id)}
            />
          ))}
        </div>
      ) : (
        <Empty className="border bg-muted/30">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icons.users />
            </EmptyMedia>
            <EmptyDescription>
              {search || governorates.length > 0 ? t("noResults") : t("empty")}
            </EmptyDescription>
          </EmptyHeader>
          {!search && governorates.length === 0 && (
            <EmptyContent>
              <Button asChild size="lg">
                <Link href={RoutePaths.CUSTOMERS.NEW.url}>
                  {t("addCustomer")}
                </Link>
              </Button>
            </EmptyContent>
          )}
        </Empty>
      )}

      {!isLoading && (page > 1 || hasNextPage) && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <Icons.chevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNextPage}
            onClick={() => setPage(page + 1)}
          >
            <Icons.chevronRight className="size-4" />
          </Button>
        </div>
      )}

      {selection.active && (
        <CustomersListSelectionBar
          selectedCustomers={selectedCustomers}
          onCancel={selection.exit}
        />
      )}
    </div>
  );
}
