"use client";

import { store } from "@dukkani/common/schemas";
import { Button } from "@dukkani/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@dukkani/ui/components/drawer";
import {
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { useState } from "react";
import { productsFilteringSearchParams } from "@/lib/products-filtering";

interface ProductSectionHeaderProps {
  storeCurrency: store.SupportedCurrencyInfer;
  categories: { id: string; name: string }[];
  title?: string;
  showFilter?: boolean;
  onFilterClick?: () => void;
}

export function ProductSectionHeader({
  title = "New Arrivals",
  storeCurrency,
  categories,
  showFilter,
}: ProductSectionHeaderProps) {
  const t = useTranslations("storefront.store.filter");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  return (
    <div className="container mx-auto mb-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{title}</h2>
        {showFilter && (
          <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                {t("button")}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter products</DrawerTitle>
              </DrawerHeader>
              <div className="mx-auto w-full max-w-sm sm:max-w-md">
                <FilterProductsForm
                  storeCurrency={storeCurrency}
                  categories={categories}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}

function FilterProductsForm({
  storeCurrency,
  categories,
}: {
  storeCurrency: store.SupportedCurrencyInfer;
  categories: { id: string; name: string }[];
}) {
  const [queryFilters, setQueryFilters] = useQueryStates(
    productsFilteringSearchParams(categories),
    {
      history: "push",
      clearOnDefault: true,
    },
  );

  const form = useAppForm({
    defaultValues: {
      minPrice: queryFilters["filters[price]"].min,
      maxPrice: queryFilters["filters[price]"].max,
      inStockOnly: queryFilters["filters[inStockOnly]"],
      sortBy: queryFilters["filters[sort]"],
      category: queryFilters["filters[category]"],
    },
    onSubmit: async ({ value }) => {
      await setQueryFilters({
        "filters[price]": { min: value.minPrice, max: value.maxPrice },
        "filters[inStockOnly]": value.inStockOnly,
        "filters[sort]": value.sortBy,
        "filters[category]": value.category,
      });
      redirect(`${window.location.search}`);
    },
  });

  const sortByOptions = [
    { label: "Newest first", value: "newest" },
    { label: "Cheapest first", value: "priceAsc" },
    { label: "Most expensive first", value: "priceDesc" },
    { label: "Featured", value: "featured", disabled: true },
  ];

  return (
    <Form onSubmit={form.handleSubmit}>
      <div className="space-y-4 p-4 pb-0">
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>Price</FieldLegend>
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <form.AppField name="minPrice">
              {(field) => (
                <field.PriceInput
                  label="Min"
                  placeholder="0"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
            <form.AppField name="maxPrice">
              {(field) => (
                <field.PriceInput
                  label="Max"
                  placeholder="1000"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>Availability</FieldLegend>
          <FieldGroup>
            <form.AppField name="inStockOnly">
              {(field) => <field.SwitchInput label="In Stock Only" />}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>Sort by</FieldLegend>
          <FieldGroup>
            <form.AppField name="sortBy">
              {(field) => (
                <field.RadioGroupInput
                  label="Sort by"
                  srOnlyLabel
                  as="pills"
                  options={sortByOptions}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>Category</FieldLegend>
          <FieldGroup>
            <form.AppField name="category">
              {(field) => (
                <field.RadioGroupInput
                  label="Category"
                  srOnlyLabel
                  as="pills"
                  options={[
                    { label: "All", value: "all" },
                    ...categories.map((cat) => ({
                      label: cat.name,
                      value: cat.name,
                    })),
                  ]}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </div>
      <DrawerFooter>
        <div className="flex space-x-2">
          <Button type="button" variant="secondary" className="mr-2 grow">
            Reset
          </Button>
          <Button className="grow">Submit</Button>
        </div>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </Form>
  );
}
