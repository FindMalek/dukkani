"use client";

import { SupportedCurrency } from "@dukkani/i18n";
import { Button } from "@dukkani/ui/components/button";
import { DrawerClose, DrawerFooter } from "@dukkani/ui/components/drawer";
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
import { productFilterParams } from "@/shared/lib/product/filters";

export interface FilterProductsFormProps {
  storeCurrency: SupportedCurrency;
  categories: { id: string; name: string }[];
  handleCloseDrawer: () => void;
}

export function FilterProductsForm({
  storeCurrency,
  categories,
  handleCloseDrawer,
}: FilterProductsFormProps) {
  const router = useRouter();
  const tFilter = useTranslations("storefront.store.filter");
  const tCategoryFilter = useTranslations("storefront.store.categoryFilter");
  const [queryFilters, setQueryFilters] = useQueryStates(productFilterParams, {
    history: "push",
    clearOnDefault: true,
  });

  const form = useAppForm({
    defaultValues: {
      minPrice: queryFilters.minPrice,
      maxPrice: queryFilters.maxPrice,
      inStock: queryFilters.inStock,
      sort: queryFilters.sort,
      category: queryFilters.category ?? "", // null → "" represents "All"
    },
    onSubmit: async ({ value }) => {
      await setQueryFilters({
        minPrice: value.minPrice,
        maxPrice: value.maxPrice,
        inStock: value.inStock,
        sort: value.sort,
        category: value.category || null, // "" → null clears the URL param
      });
      handleCloseDrawer?.();
      router.refresh();
    },
  });

  const sortByOptions = [
    { label: tFilter("sortOptions.newest"), value: "newest" },
    { label: tFilter("sortOptions.cheapest"), value: "priceAsc" },
    { label: tFilter("sortOptions.mostExpensive"), value: "priceDesc" },
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
            <form.AppField name="inStock">
              {(field) => <field.SwitchInput label={tFilter("inStockOnly")} />}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="rounded-md border px-4 pb-3">
          <FieldLegend>{tFilter("sortBy")}</FieldLegend>
          <FieldGroup>
            <form.AppField name="sort">
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
                    { label: tCategoryFilter("all"), value: "" },
                    ...categories.map((cat) => ({
                      label: cat.name,
                      value: cat.id,
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
                minPrice: null,
                maxPrice: null,
                inStock: false,
                sort: "newest",
                category: null,
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
