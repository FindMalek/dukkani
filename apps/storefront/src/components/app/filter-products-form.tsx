"use client";

import { store } from "@dukkani/common/schemas";
import { Button } from "@dukkani/ui/components/button";
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@dukkani/ui/components/drawer";
import {
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Label } from "@dukkani/ui/components/label";
import { Switch } from "@dukkani/ui/components/switch";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { appQueries } from "@/shared/api/queries";
import {
  buildProductFiltersInput,
  type ProductFilters,
  productFilterParams,
} from "@/shared/lib/product/filters";

export interface FilterProductsFormProps {
  storeId: string;
  storeCurrency: store.SupportedCurrencyInfer;
  categories: { id: string; name: string }[];
  handleCloseDrawer: () => void;
}

type LiveFilterValues = Pick<
  ProductFilters,
  "sort" | "category" | "minPrice" | "maxPrice" | "inStock"
>;

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}

function useLiveResultCount(storeId: string, values: LiveFilterValues) {
  const debouncedValues = useDebouncedValue(values, 300);

  const { data } = useQuery(
    appQueries.product.getAll({
      input: {
        storeId,
        limit: 1,
        ...buildProductFiltersInput(debouncedValues),
      },
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
    }),
  );

  return data?.total;
}

export function FilterProductsForm({
  storeId,
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

  const handleReset = async () => {
    await setQueryFilters({
      minPrice: null,
      maxPrice: null,
      inStock: false,
      sort: "newest",
      category: null,
    });
    form.reset();
    router.refresh();
  };

  const sortByOptions = [
    { label: tFilter("sortOptions.newest"), value: "newest" },
    { label: tFilter("sortOptions.cheapest"), value: "priceAsc" },
    { label: tFilter("sortOptions.mostExpensive"), value: "priceDesc" },
  ];

  return (
    <Form
      onSubmit={form.handleSubmit}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <DrawerHeader className="flex-row items-center justify-between gap-2 border-b pb-3">
        <DrawerTitle>{tFilter("drawerTitle")}</DrawerTitle>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="h-auto p-0 text-muted-foreground"
          onClick={handleReset}
        >
          {tFilter("reset")}
        </Button>
      </DrawerHeader>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <FieldSet className="gap-2">
          <FieldLegend className="font-medium text-sm">
            {tFilter("priceRange")}
          </FieldLegend>
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <form.AppField name="minPrice">
              {(field) => (
                <field.PriceInput
                  label={tFilter("min")}
                  srOnlyLabel
                  placeholder="0"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
            <form.AppField name="maxPrice">
              {(field) => (
                <field.PriceInput
                  label={tFilter("max")}
                  srOnlyLabel
                  placeholder="1000"
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="gap-2">
          <FieldLegend className="font-medium text-sm">
            {tFilter("availability")}
          </FieldLegend>
          <FieldGroup>
            <form.AppField name="inStock">
              {(field) => (
                <Label
                  htmlFor={field.name}
                  className="flex items-center justify-between rounded-full bg-primary/10 px-4 py-2.5 font-normal"
                >
                  {tFilter("inStockOnly")}
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    onBlur={field.handleBlur}
                  />
                </Label>
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
        <FieldSet className="gap-2">
          <FieldLegend className="font-medium text-sm">
            {tFilter("sortBy")}
          </FieldLegend>
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
        <FieldSet className="gap-2">
          <FieldLegend className="font-medium text-sm">
            {tFilter("category")}
          </FieldLegend>
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
      <DrawerFooter className="flex-row gap-2 border-t pt-3">
        <DrawerClose asChild>
          <Button type="button" variant="ghost" className="grow">
            {tFilter("close")}
          </Button>
        </DrawerClose>
        <form.Subscribe selector={(state) => state.values}>
          {(values) => (
            <SubmitWithCount
              storeId={storeId}
              values={values}
              label={tFilter}
            />
          )}
        </form.Subscribe>
      </DrawerFooter>
    </Form>
  );
}

function toNullableNumber(value: number | string | null): number | null {
  if (value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function SubmitWithCount({
  storeId,
  values,
  label,
}: {
  storeId: string;
  values: {
    minPrice: number | string | null;
    maxPrice: number | string | null;
    inStock: boolean;
    sort: LiveFilterValues["sort"];
    category: string;
  };
  label: ReturnType<typeof useTranslations>;
}) {
  const count = useLiveResultCount(storeId, {
    sort: values.sort,
    category: values.category || null,
    minPrice: toNullableNumber(values.minPrice),
    maxPrice: toNullableNumber(values.maxPrice),
    inStock: values.inStock,
  });

  return (
    <Button type="submit" className="grow">
      {label("showResults", { count: count ?? "…" })}
    </Button>
  );
}
