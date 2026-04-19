"use client";

import { MAX_VARIANT_COMBINATIONS } from "@dukkani/common/utils";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent, CardHeader } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";
import type { ProductFormVariantsField } from "@/hooks/use-product-form-variants-field";
import type { ProductFormApi } from "@/shared/lib/product/form";
import { PendingRemovalBanner } from "./products-variant-pending-removal-banner";

type ProductsVariantOptionsSectionProps = {
  form: ProductFormApi;
  v: ProductFormVariantsField;
};

export function ProductsVariantOptionsSection({
  form,
  v,
}: ProductsVariantOptionsSectionProps) {
  const t = useTranslations("products.create");

  return (
    <>
      {v.pendingRemoval && (
        <PendingRemovalBanner
          pending={v.pendingRemoval}
          onConfirm={v.handleConfirmPendingRemoval}
          onUndo={v.handleUndoPendingRemoval}
        />
      )}

      <form.Subscribe selector={(s) => s.values.variantOptions ?? []}>
        {(variantOptions) => (
          <div className="flex flex-col gap-3">
            {variantOptions.map((opt, optIdx) => (
              <Card key={`opt-${optIdx}`} className="gap-4 py-4 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pt-0 pb-0">
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    {t("form.variants.options.optionName")}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => v.handleRemoveOption(optIdx)}
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:bg-muted hover:text-destructive"
                    aria-label={t("form.variants.options.remove")}
                  >
                    <Icons.trash className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-3 px-4 pt-0 pb-0">
                  <form.AppField name={`variantOptions[${optIdx}].name`}>
                    {(field) => (
                      <field.TextInput
                        label={t("form.variants.options.optionName")}
                        srOnlyLabel
                        placeholder={t(
                          "form.variants.options.optionNamePlaceholder",
                        )}
                        onBlur={() => {
                          const opts =
                            form.getFieldValue("variantOptions") ?? [];
                          v.doReconcile(opts);
                        }}
                      />
                    )}
                  </form.AppField>

                  <div className="flex flex-wrap items-center gap-2">
                    {opt.values.map((val, valIdx) => (
                      <form.AppField
                        key={`opt-${optIdx}-val-${valIdx}`}
                        name={`variantOptions[${optIdx}].values[${valIdx}].value`}
                      >
                        {(field) => (
                          <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5">
                            <Input
                              value={field.state.value ?? ""}
                              onChange={(e) => {
                                field.handleChange(e.target.value);
                              }}
                              onBlur={() => {
                                field.handleBlur();
                                const opts =
                                  form.getFieldValue("variantOptions") ?? [];
                                v.doReconcile(opts);
                              }}
                              className="h-auto w-14 min-w-0 border-0 bg-transparent px-0 py-0 text-primary text-sm shadow-none focus-visible:ring-0 md:text-sm"
                              placeholder={t("form.variants.options.value")}
                              aria-label={t("form.variants.options.value")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() =>
                                v.handleRemoveValue(optIdx, valIdx)
                              }
                              className="ml-0.5 h-6 w-6 shrink-0 p-0 text-primary hover:bg-transparent hover:text-primary/80"
                              aria-label={t(
                                "form.variants.options.removeValue",
                              )}
                            >
                              <Icons.x className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </form.AppField>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => v.handleAddValue(optIdx)}
                      className="h-auto rounded-full border-muted-foreground/40 border-dashed px-3 py-1.5 font-normal text-muted-foreground hover:border-foreground hover:text-foreground"
                    >
                      <Icons.plus className="h-3 w-3" />
                      {t("form.variants.options.addValue")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="ghost"
              onClick={v.handleAddOption}
              disabled={variantOptions.length >= 3}
              className="h-auto justify-start gap-2 px-0 py-1 font-normal text-primary hover:bg-transparent hover:text-primary/90 disabled:opacity-50"
            >
              <Icons.plusCircle className="h-4 w-4" />
              {t("form.variants.options.addAnother")}
              {variantOptions.length >= 3 && (
                <span className="text-muted-foreground text-xs">
                  — {t("form.variants.options.maxOptions")}
                </span>
              )}
            </Button>

            {v.comboCount > MAX_VARIANT_COMBINATIONS && (
              <p className="text-destructive text-xs">
                {t("form.variants.matrix.tooMany", {
                  max: MAX_VARIANT_COMBINATIONS,
                })}
              </p>
            )}
          </div>
        )}
      </form.Subscribe>
    </>
  );
}
