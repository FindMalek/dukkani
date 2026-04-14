"use client";

import {
  countVariantCombinations,
  MAX_VARIANT_COMBINATIONS,
  selectionKey,
} from "@dukkani/common/utils";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent, CardFooter } from "@dukkani/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
} from "@dukkani/ui/components/collapsible";
import {
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dukkani/ui/components/table";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { productFormOptions } from "@/shared/lib/product/form";
import { ProductVariantMatrixSync } from "./product-variant-matrix-sync";

export const ProductFormVariants = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    const t = useTranslations("products.create");

    const handleAddNewVariantOption = useCallback(() => {
      if (
        form.state.values.variantOptions?.some((option) => option.name === "")
      ) {
        return;
      }
      form.setFieldValue("variantOptions", (prev) => [
        ...(prev ?? []),
        { name: "", values: [] },
      ]);
    }, [form]);

    const comboCount = useMemo(() => {
      const opts = form.state.values.variantOptions ?? [];
      return countVariantCombinations(opts);
    }, [form.state.values.variantOptions]);

    return (
      <>
        <form.AppField
          name="hasVariants"
          listeners={{
            onChange: ({ value }) => {
              if (value) {
                form.setFieldValue("variantOptions", [
                  { name: "", values: [] },
                ]);
                form.setFieldValue("variants", []);
              } else {
                form.setFieldValue("variantOptions", []);
                form.setFieldValue("variants", []);
              }
            },
          }}
        >
          {(field) => (
            <field.SwitchInput
              label={t("form.options.label")}
              description={t("form.options.description")}
            />
          )}
        </form.AppField>
        <ProductVariantMatrixSync form={form} />
        <form.Subscribe selector={(state) => state.values.hasVariants}>
          {(hasVariants) => (
            <Collapsible open={hasVariants}>
              <CollapsibleContent>
                <FieldSet className="mx-6">
                  <Card className="mb-4">
                    <CardContent>
                      <form.AppField name="variantOptions" mode="array">
                        {(variantOptionsField) => (
                          <variantOptionsField.ArrayInput
                            label={t("form.variants.options.title")}
                            srOnlyLabel
                          >
                            {variantOptionsField.state.value?.map(
                              (variantOption, variantOptionIndex) => (
                                <form.AppField
                                  name={`variantOptions[${variantOptionIndex}].name`}
                                  key={"variantOption-" + variantOptionIndex}
                                >
                                  {(field) => (
                                    <FieldGroup>
                                      <field.TextInput
                                        label={t(
                                          "form.variants.options.optionName",
                                        )}
                                        srOnlyLabel
                                        rightToField={
                                          <Button
                                            type="button"
                                            variant="secondary"
                                            size="icon"
                                            onClick={() =>
                                              variantOptionsField.removeValue(
                                                variantOptionIndex,
                                              )
                                            }
                                            aria-label={t(
                                              "form.variants.options.remove",
                                            )}
                                          >
                                            <Icons.trash className="h-4 w-4" />
                                          </Button>
                                        }
                                      />
                                      <form.AppField
                                        name={`variantOptions[${variantOptionIndex}].values`}
                                        mode="array"
                                      >
                                        {(variantOptionsValuesField) => (
                                          <variantOptionsValuesField.ArrayInput
                                            label={t(
                                              "form.variants.options.values",
                                            )}
                                            srOnlyLabel
                                          >
                                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                              {(
                                                variantOptionsValuesField.state
                                                  .value ?? []
                                              ).map((_value, valueIndex) => (
                                                <form.AppField
                                                  name={`variantOptions[${variantOptionIndex}].values[${valueIndex}].value`}
                                                  key={
                                                    "variantOption-" +
                                                    variantOptionIndex +
                                                    "-value-" +
                                                    valueIndex
                                                  }
                                                >
                                                  {(pillField) => (
                                                    <pillField.PillInput
                                                      label={t(
                                                        "form.variants.options.value",
                                                      )}
                                                      onDelete={() =>
                                                        variantOptionsValuesField.removeValue(
                                                          valueIndex,
                                                        )
                                                      }
                                                    />
                                                  )}
                                                </form.AppField>
                                              ))}
                                              <Button
                                                type="button"
                                                className="rounded-full"
                                                variant={"outline"}
                                                aria-label={t(
                                                  "form.variants.options.addValue",
                                                )}
                                                onClick={() => {
                                                  if (
                                                    variantOptionsValuesField.state.value?.some(
                                                      (value) =>
                                                        value.value === "",
                                                    )
                                                  ) {
                                                    return;
                                                  }
                                                  variantOptionsValuesField.pushValue(
                                                    { value: "" },
                                                  );
                                                }}
                                              >
                                                <Icons.plus />
                                              </Button>
                                            </div>
                                          </variantOptionsValuesField.ArrayInput>
                                        )}
                                      </form.AppField>
                                      <FieldSeparator />
                                    </FieldGroup>
                                  )}
                                </form.AppField>
                              ),
                            )}
                          </variantOptionsField.ArrayInput>
                        )}
                      </form.AppField>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={handleAddNewVariantOption}
                        aria-label={t("form.variants.options.addAnother")}
                      >
                        <Icons.plus />
                      </Button>
                    </CardFooter>
                  </Card>

                  <div className="mt-4 space-y-2">
                    <h3 className="font-medium text-sm">
                      {t("form.variants.matrix.title")}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {t("form.variants.matrix.hint")}
                    </p>
                    {comboCount > MAX_VARIANT_COMBINATIONS ? (
                      <p className="text-destructive text-xs">
                        {t("form.variants.matrix.tooMany", {
                          max: MAX_VARIANT_COMBINATIONS,
                        })}
                      </p>
                    ) : null}
                    <form.Subscribe
                      selector={(s) => s.values.variants?.length ?? 0}
                    >
                      {(variantCount) =>
                        variantCount === 0 ? (
                          <p className="text-muted-foreground text-sm">
                            {t("form.variants.matrix.empty")}
                          </p>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="min-w-[140px]">
                                  {t("form.variants.matrix.columnCombination")}
                                </TableHead>
                                <TableHead className="w-28">
                                  {t("form.variants.matrix.columnSku")}
                                </TableHead>
                                <TableHead className="w-24">
                                  {t("form.variants.matrix.columnPrice")}
                                </TableHead>
                                <TableHead className="w-24">
                                  {t("form.variants.matrix.columnStock")}
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Array.from({ length: variantCount }).map(
                                (_, rowIndex) => (
                                  <TableRow
                                    key={`${rowIndex}-${selectionKey(
                                      form.state.values.variants?.[rowIndex]
                                        ?.selections ?? {},
                                    )}`}
                                  >
                                    <TableCell>
                                      <form.Subscribe
                                        selector={(s) =>
                                          s.values.variants?.[rowIndex]
                                            ?.selections ?? {}
                                        }
                                      >
                                        {(selections) => (
                                          <div className="flex flex-wrap gap-1">
                                            {Object.entries(selections).map(
                                              ([k, v]) => (
                                                <Badge
                                                  key={`${k}-${v}`}
                                                  variant="secondary"
                                                  className="font-normal text-xs"
                                                >
                                                  {k}: {v}
                                                </Badge>
                                              ),
                                            )}
                                          </div>
                                        )}
                                      </form.Subscribe>
                                    </TableCell>
                                    <TableCell>
                                      <form.AppField
                                        name={`variants[${rowIndex}].sku`}
                                      >
                                        {(cell) => (
                                          <cell.TextInput
                                            label={t(
                                              "form.variants.matrix.columnSku",
                                            )}
                                            srOnlyLabel
                                            placeholder={t(
                                              "form.variants.matrix.skuPlaceholder",
                                            )}
                                          />
                                        )}
                                      </form.AppField>
                                    </TableCell>
                                    <TableCell>
                                      <form.AppField
                                        name={`variants[${rowIndex}].price`}
                                      >
                                        {(cell) => (
                                          <cell.TextInput
                                            label={t(
                                              "form.variants.matrix.columnPrice",
                                            )}
                                            srOnlyLabel
                                            type="text"
                                            inputMode="decimal"
                                            placeholder={t(
                                              "form.variants.matrix.pricePlaceholder",
                                            )}
                                          />
                                        )}
                                      </form.AppField>
                                    </TableCell>
                                    <TableCell>
                                      <form.AppField
                                        name={`variants[${rowIndex}].stock`}
                                      >
                                        {(cell) => (
                                          <cell.TextInput
                                            label={t(
                                              "form.variants.matrix.columnStock",
                                            )}
                                            srOnlyLabel
                                            type="text"
                                            inputMode="numeric"
                                          />
                                        )}
                                      </form.AppField>
                                    </TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        )
                      }
                    </form.Subscribe>
                  </div>
                </FieldSet>
              </CollapsibleContent>
            </Collapsible>
          )}
        </form.Subscribe>
      </>
    );
  },
});

export function ProductFormVariantsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full max-w-md" />
        </div>
        <Skeleton className="h-6 w-10 shrink-0 rounded-full" />
      </div>
    </div>
  );
}
