"use client";

import { Button } from "@dukkani/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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
  title?: string;
  showFilter?: boolean;
  onFilterClick?: () => void;
}

export function ProductSectionHeader({
  title = "New Arrivals",
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
                <FilterProductsForm />
                <DrawerFooter>
                  <Button>Submit</Button>
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



function FilterProductsForm() {
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
  return (
    <div className="space-y-4 p-4 pb-0">
      <div className="flex items-center justify-between">
        <span>Filter Products</span>
        <Button variant="secondary">Reset</Button>
      </div>

      <Form onSubmit={form.handleSubmit} className="space-y-6">
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>Price</FieldLegend>
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <form.AppField name="price.min">
              {(field) => (
                <field.PriceInput
                  label="Min"
                  placeholder="0"
                />
              )}
            </form.AppField>
            <form.AppField name="price.max">
              {(field) => (
                <field.PriceInput
                  label="Max"
                  placeholder="1000"
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
          <FieldGroup />
        </FieldSet>
      </Form>
    </div>
  );
}
