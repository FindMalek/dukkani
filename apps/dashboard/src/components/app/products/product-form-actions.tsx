"use client";

import { Button } from "@dukkani/ui/components/button";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import type { MutableRefObject } from "react";
import type { ProductSubmitIntent } from "@/hooks/use-product-form";
import { productFormOptions } from "@/lib/product-form-options";

export const ProductFormActions = withForm({
  ...productFormOptions,
  props: {
    isEdit: false,
    hasDraft: false,
    submitIntentRef: {
      current: "save",
    } as MutableRefObject<ProductSubmitIntent>,
    onDiscardDraft: () => {
      /* no-op default */
    },
    isDiscardingDraft: false,
  },
  render: function Render({
    form,
    isEdit,
    hasDraft,
    submitIntentRef,
    onDiscardDraft,
    isDiscardingDraft,
  }) {
    const t = useTranslations("products.create");
    return (
      <div className="flex w-full flex-col gap-3">
        {isEdit && hasDraft ? (
          <p className="text-center text-muted-foreground text-sm">
            {t("form.draftHint")}
          </p>
        ) : null}
        <form.Subscribe>
          {(formState) => (
            <form.AppField name="published">
              {(field) => (
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  {isEdit ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        disabled={
                          formState.isSubmitting || !formState.canSubmit
                        }
                        onClick={() => {
                          submitIntentRef.current = "save";
                          form.handleSubmit();
                        }}
                      >
                        {t("form.saveChanges")}
                      </Button>
                      <Button
                        type="button"
                        className="flex-1"
                        disabled={
                          formState.isSubmitting || !formState.canSubmit
                        }
                        onClick={() => {
                          submitIntentRef.current = "saveAndPublish";
                          field.handleChange(true);
                          form.handleSubmit();
                        }}
                      >
                        {t("form.publishVersion")}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        disabled={
                          formState.isSubmitting || !formState.canSubmit
                        }
                        onClick={() => {
                          field.handleChange(false);
                          form.handleSubmit();
                        }}
                      >
                        {t("form.saveDraft")}
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={
                          formState.isSubmitting || !formState.canSubmit
                        }
                        onClick={() => field.handleChange(true)}
                      >
                        {t("form.savePublish")}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </form.AppField>
          )}
        </form.Subscribe>
        {isEdit && hasDraft ? (
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground"
            disabled={isDiscardingDraft}
            onClick={() => {
              void onDiscardDraft();
            }}
          >
            {t("form.discardDraft")}
          </Button>
        ) : null}
      </div>
    );
  },
});

export function ProductFormActionsSkeleton() {
  return (
    <div className="flex w-full gap-2 pt-2">
      <Skeleton className="h-10 flex-1 rounded-md" />
      <Skeleton className="h-10 flex-1 rounded-md" />
    </div>
  );
}
