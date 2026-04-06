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
import { useRouter } from "next/navigation";
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
  title,
  storeCurrency,
  categories,
}: ProductSectionHeaderProps) {
  const tFilter = useTranslations("storefront.store.filter");
  const tProducts = useTranslations("storefront.store.products");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const sectionTitle = title ?? tProducts("title");

  return (
    <div className="container mx-auto mb-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{sectionTitle}</h2>
        <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              {tFilter("button")}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{tFilter("drawerTitle")}</DrawerTitle>
            </DrawerHeader>
            <div className="mx-auto w-full max-w-sm sm:max-w-md">
              <FilterProductsForm
                storeCurrency={storeCurrency}
                categories={categories}
                handleCloseDrawer={() => setFilterDrawerOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

interface FilterProductsFormProps {
  storeCurrency: store.SupportedCurrencyInfer;
  categories: { id: string; name: string }[];
  handleCloseDrawer: () => void;
}

function FilterProductsForm({
  storeCurrency,
  categories,
  handleCloseDrawer,
}: FilterProductsFormProps) {
  const router = useRouter();
  const tFilter = useTranslations("storefront.store.filter");
  const tCategoryFilter = useTranslations("storefront.store.categoryFilter");
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
      handleCloseDrawer?.();
      router.refresh();
    },
  });

  const sortByOptions = [
    { label: tFilter("sortOptions.newest"), value: "newest" },
    { label: tFilter("sortOptions.cheapest"), value: "priceAsc" },
    { label: tFilter("sortOptions.mostExpensive"), value: "priceDesc" },
    {
      label: tFilter("sortOptions.featured"),
      value: "featured",
      disabled: true,
    },
  ];

  return (
    <Form onSubmit={form.handleSubmit}>
      <div className="space-y-4 p-4 pb-0">
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>{tFilter("price")}</FieldLegend>
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <form.AppField name="minPrice">
              {(field) => (
                <field.PriceInput
                  label={tFilter("min")}
                  placeholder="0"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
            <form.AppField name="maxPrice">
              {(field) => (
                <field.PriceInput
                  label={tFilter("max")}
                  placeholder="1000"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>{tFilter("availability")}</FieldLegend>
          <FieldGroup>
            <form.AppField name="inStockOnly">
              {(field) => <field.SwitchInput label={tFilter("inStockOnly")} />}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>{tFilter("sortBy")}</FieldLegend>
          <FieldGroup>
            <form.AppField name="sortBy">
              {(field) => (
                <field.RadioGroupInput
                  label={tFilter("sortBy")}
                  srOnlyLabel
                  as="pills"
                  options={sortByOptions}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>{tFilter("category")}</FieldLegend>
          <FieldGroup>
            <form.AppField name="category">
              {(field) => (
                <field.RadioGroupInput
                  label={tFilter("category")}
                  srOnlyLabel
                  as="pills"
                  options={[
                    { label: tCategoryFilter("all"), value: "all" },
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
          <Button
            type="button"
            variant="secondary"
            className="mr-2 grow"
            onClick={async () => {
              await setQueryFilters({
                "filters[price]": { min: "", max: "" },
                "filters[inStockOnly]": false,
                "filters[sort]": "newest",
                "filters[category]": "all",
              });
              form.reset();
              router.refresh();
            }}
          >
            {tFilter("reset")}
          </Button>
          <Button className="grow">{tFilter("submit")}</Button>
        </div>
        <DrawerClose asChild>
          <Button type="button" variant="outline">
            {tFilter("cancel")}
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </Form>
  );
}
