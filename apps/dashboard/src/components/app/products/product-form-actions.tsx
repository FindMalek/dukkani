"use client";

import { Button } from "@dukkani/ui/components/button";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { productFormOptions } from "@/lib/product-form-options";

export const ProductFormActions = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    const t = useTranslations("products.create");
    return (
      <form.Subscribe>
        {(formState) => (
          <form.AppField name="published">
            {(field) => (
              <div className="flex w-full items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={formState.isSubmitting || !formState.canSubmit}
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
                  disabled={formState.isSubmitting || !formState.canSubmit}
                  onClick={() => field.handleChange(true)}
                >
                  {t("form.savePublish")}
                </Button>
              </div>
            )}
          </form.AppField>
        )}
      </form.Subscribe>
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
