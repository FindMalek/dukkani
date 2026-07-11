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
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { Slider } from "@dukkani/ui/components/slider";
import { Switch } from "@dukkani/ui/components/switch";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { useEffect, useMemo, useState } from "react";
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Rounds `rawStep` up to the nearest 1x/2x/5x power of ten (D3-style tick step). */
function niceStep(rawStep: number): number {
  const magnitude = 10 ** Math.floor(Math.log10(Math.max(rawStep, 1)));
  const normalized = rawStep / magnitude;
  const niceNormalized =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return niceNormalized * magnitude;
}

/**
 * Widens exact catalog min/max prices to clean slider bounds (e.g. 12.99-899.5
 * -> 0-900) so the track reads as a round number instead of an arbitrary decimal.
 * Guards the degenerate single-price-catalog case (min === max) by padding max by 1.
 */
function roundPriceBounds(
  min: number,
  max: number,
): { min: number; max: number } {
  const safeMax = max > min ? max : min + 1;
  const step = niceStep((safeMax - min) / 10);
  return {
    min: Math.max(0, Math.floor(min / step) * step),
    max: Math.ceil(safeMax / step) * step,
  };
}

function usePriceBounds(storeId: string) {
  return useQuery(
    appQueries.product.getPriceBounds({
      input: { storeId },
      staleTime: 60 * 1000,
    }),
  );
}

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
    const cleared = {
      minPrice: null,
      maxPrice: null,
      inStock: false,
      sort: "newest" as const,
      category: "", // null → "" represents "All", matching defaultValues
    };
    await setQueryFilters({ ...cleared, category: null });
    form.reset(cleared);
    router.refresh();
  };

  const sortByOptions = [
    { label: tFilter("sortOptions.newest"), value: "newest" },
    { label: tFilter("sortOptions.cheapest"), value: "priceAsc" },
    { label: tFilter("sortOptions.mostExpensive"), value: "priceDesc" },
  ];

  const priceBoundsQuery = usePriceBounds(storeId);
  const roundedBounds = priceBoundsQuery.data
    ? roundPriceBounds(priceBoundsQuery.data.min, priceBoundsQuery.data.max)
    : null;
  const sliderStep = roundedBounds
    ? Math.max(1, Math.round((roundedBounds.max - roundedBounds.min) / 100))
    : 1;

  return (
    <Form onSubmit={form.handleSubmit} className="flex flex-col">
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
      <div className="max-h-[50vh] space-y-3 overflow-y-auto p-4">
        <FieldSet className="gap-2">
          <FieldLegend className="font-medium text-sm">
            {tFilter("priceRange")}
          </FieldLegend>
          <div className="mb-1 px-1">
            {priceBoundsQuery.isLoading ? (
              <Skeleton className="h-1.5 w-full rounded-full" />
            ) : (
              roundedBounds && (
                <form.Subscribe
                  selector={(state) => ({
                    min: state.values.minPrice,
                    max: state.values.maxPrice,
                  })}
                >
                  {({ min, max }) => (
                    <Slider
                      min={roundedBounds.min}
                      max={roundedBounds.max}
                      step={sliderStep}
                      minStepsBetweenThumbs={1}
                      value={[
                        clamp(
                          toNullableNumber(min) ?? roundedBounds.min,
                          roundedBounds.min,
                          roundedBounds.max,
                        ),
                        clamp(
                          toNullableNumber(max) ?? roundedBounds.max,
                          roundedBounds.min,
                          roundedBounds.max,
                        ),
                      ]}
                      onValueChange={([newMin, newMax]) => {
                        // Snap back to null (unbounded) at the track edges instead of
                        // pinning to the fetched bound, so a touch-and-release keeps
                        // "no filter" semantics consistent with Reset/defaultValues.
                        form.setFieldValue(
                          "minPrice",
                          newMin != null && newMin > roundedBounds.min
                            ? newMin
                            : null,
                        );
                        form.setFieldValue(
                          "maxPrice",
                          newMax != null && newMax < roundedBounds.max
                            ? newMax
                            : null,
                        );
                      }}
                    />
                  )}
                </form.Subscribe>
              )
            )}
          </div>
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <form.AppField name="minPrice">
              {(field) => (
                <field.PriceInput
                  label={tFilter("min")}
                  srOnlyLabel
                  placeholder={String(roundedBounds?.min ?? 0)}
                  currency={storeCurrency}
                />
              )}
            </form.AppField>
            <form.AppField name="maxPrice">
              {(field) => (
                <field.PriceInput
                  label={tFilter("max")}
                  srOnlyLabel
                  placeholder={roundedBounds ? String(roundedBounds.max) : "—"}
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
                <Label className="flex items-center justify-between rounded-full bg-primary/10 px-4 py-2.5 font-normal">
                  {tFilter("inStockOnly")}
                  <Switch
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
  const memoizedValues = useMemo(
    () => ({
      sort: values.sort,
      category: values.category || null,
      minPrice: toNullableNumber(values.minPrice),
      maxPrice: toNullableNumber(values.maxPrice),
      inStock: values.inStock,
    }),
    [
      values.sort,
      values.category,
      values.minPrice,
      values.maxPrice,
      values.inStock,
    ],
  );
  const count = useLiveResultCount(storeId, memoizedValues);

  return (
    <Button type="submit" className="grow">
      {label("showResults", { count: count ?? "…" })}
    </Button>
  );
}
