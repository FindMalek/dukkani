"use client";

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
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { productFormOptions } from "@/lib/product-form-options";

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
              } else {
                form.setFieldValue("variantOptions", []);
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
                                                  key={"variantOption-" + variantOptionIndex + "-value-" + valueIndex}
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
                </FieldSet>
              </CollapsibleContent>
            </Collapsible>
          )}
        </form.Subscribe>
      </>
    );
  },
});
