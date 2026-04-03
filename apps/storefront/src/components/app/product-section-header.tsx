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
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ProductSectionHeaderProps {
  storeCurrency: store.SupportedCurrencyInfer;
  title?: string;
  showFilter?: boolean;
  onFilterClick?: () => void;
}

export function ProductSectionHeader({
  title = "New Arrivals",
  storeCurrency,
  showFilter,
  onFilterClick,
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
                <FilterProductsForm storeCurrency={storeCurrency} />
                <DrawerFooter>
                  <div className="flex space-x-2">
                    <Button variant="secondary" className="mr-2 grow">
                      Reset
                    </Button>
                    <Button className="grow">Submit</Button>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
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
}: {
  storeCurrency: store.SupportedCurrencyInfer;
}) {
  const form = useAppForm({
    defaultValues: {
      price: {
        min: "",
        max: "",
      },
      inStockOnly: false,
      sortBy: "featured",
      category: "all",
    },
  });

  const sortByOptions = [
    { label: "Featured", value: "featured" },
    { label: "Cheapest first", value: "priceAsc" },
    { label: "Most expensive first", value: "priceDesc" },
    { label: "Newest first", value: "newest" },
  ];

  return (
    <div className="space-y-4 p-4 pb-0">
      <Form onSubmit={form.handleSubmit} className="space-y-6">
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>Price</FieldLegend>
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <form.AppField name="price.min">
              {(field) => (
                <field.PriceInput
                  label="Min"
                  placeholder="0"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
            <form.AppField name="price.max">
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
                  label="Price"
                  as="cards"
                  options={sortByOptions}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </Form>
    </div>
  );
}
