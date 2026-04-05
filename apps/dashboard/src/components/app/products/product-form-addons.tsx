"use client";

import { ProductAddonSelectionType } from "@dukkani/common/schemas/product-addon/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import {
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { productFormOptions } from "@/lib/product-form-options";

const selectionTypeOptions = [
  {
    id: ProductAddonSelectionType.SINGLE,
    nameKey: "single" as const,
  },
  {
    id: ProductAddonSelectionType.MULTIPLE,
    nameKey: "multiple" as const,
  },
];

export const ProductFormAddons = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    const t = useTranslations("products.create.form.addons");

    const selectionSelectGroups = useMemo(
      () => [
        {
          id: "addon-selection-type",
          options: selectionTypeOptions.map((o) => ({
            id: o.id,
            name: t(`selectionType.${o.nameKey}`),
          })),
        },
      ],
      [t],
    );

    const handleAddGroup = useCallback(() => {
      form.setFieldValue("addonGroups", (prev) => [
        ...(prev ?? []),
        {
          name: "",
          sortOrder: String((prev ?? []).length),
          selectionType: ProductAddonSelectionType.SINGLE,
          required: false,
          options: [
            {
              name: "",
              sortOrder: "0",
              priceDelta: "0",
              stock: "0",
            },
          ],
        },
      ]);
    }, [form]);

    return (
      <FieldSet className="mx-6">
        <FieldSeparator />
        <h3 className="font-medium text-sm">{t("title")}</h3>
        <p className="text-muted-foreground text-xs">{t("description")}</p>
        <form.AppField name="addonGroups" mode="array">
          {(addonGroupsField) => (
            <div className="space-y-4">
              {(addonGroupsField.state.value ?? []).map((_, groupIndex) => (
                <Card key={`addon-group-${groupIndex}`}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="min-w-[160px] flex-1">
                        <form.AppField name={`addonGroups[${groupIndex}].name`}>
                          {(field) => (
                            <field.TextInput
                              label={t("groupName")}
                              placeholder={t("groupNamePlaceholder")}
                            />
                          )}
                        </form.AppField>
                      </div>
                      <div className="w-44">
                        <form.AppField
                          name={`addonGroups[${groupIndex}].selectionType`}
                        >
                          {(field) => (
                            <field.SelectInput
                              label={t("selectionType.label")}
                              options={selectionSelectGroups}
                            />
                          )}
                        </form.AppField>
                      </div>
                      <form.AppField
                        name={`addonGroups[${groupIndex}].required`}
                      >
                        {(field) => <field.SwitchInput label={t("required")} />}
                      </form.AppField>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="shrink-0"
                        aria-label={t("removeGroup")}
                        onClick={() => addonGroupsField.removeValue(groupIndex)}
                      >
                        <Icons.trash className="size-4" />
                      </Button>
                    </div>
                    <FieldGroup>
                      <p className="font-medium text-muted-foreground text-xs">
                        {t("optionsTitle")}
                      </p>
                      <form.AppField
                        name={`addonGroups[${groupIndex}].options`}
                        mode="array"
                      >
                        {(optionsField) => (
                          <div className="space-y-2">
                            {optionsField.state.value?.map((_, optionIndex) => (
                              <div
                                key={`addon-opt-${groupIndex}-${optionIndex}`}
                                className="flex flex-wrap items-end gap-2 border-border border-b pb-2 last:border-b-0"
                              >
                                <div className="min-w-[120px] flex-1">
                                  <form.AppField
                                    name={`addonGroups[${groupIndex}].options[${optionIndex}].name`}
                                  >
                                    {(f) => (
                                      <f.TextInput
                                        label={t("optionName")}
                                        placeholder={t("optionNamePlaceholder")}
                                        srOnlyLabel
                                      />
                                    )}
                                  </form.AppField>
                                </div>
                                <div className="w-24">
                                  <form.AppField
                                    name={`addonGroups[${groupIndex}].options[${optionIndex}].priceDelta`}
                                  >
                                    {(f) => (
                                      <f.TextInput
                                        label={t("priceDelta")}
                                        type="text"
                                        inputMode="decimal"
                                        srOnlyLabel
                                      />
                                    )}
                                  </form.AppField>
                                </div>
                                <div className="w-24">
                                  <form.AppField
                                    name={`addonGroups[${groupIndex}].options[${optionIndex}].stock`}
                                  >
                                    {(f) => (
                                      <f.TextInput
                                        label={t("stock")}
                                        type="text"
                                        inputMode="numeric"
                                        srOnlyLabel
                                      />
                                    )}
                                  </form.AppField>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0"
                                  aria-label={t("removeOption")}
                                  onClick={() =>
                                    optionsField.removeValue(optionIndex)
                                  }
                                >
                                  <Icons.minus className="size-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() =>
                                optionsField.pushValue({
                                  name: "",
                                  sortOrder: String(
                                    optionsField.state.value?.length ?? 0,
                                  ),
                                  priceDelta: "0",
                                  stock: "0",
                                })
                              }
                            >
                              <Icons.plus className="size-4" />
                              {t("addOption")}
                            </Button>
                          </div>
                        )}
                      </form.AppField>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleAddGroup}
              >
                <Icons.plus />
                {t("addGroup")}
              </Button>
            </div>
          )}
        </form.AppField>
      </FieldSet>
    );
  },
});
