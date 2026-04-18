"use client";

import { Button } from "@dukkani/ui/components/button";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { productFormOptions } from "@/shared/lib/product/form";

export const ProductFormActions = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    const t = useTranslations("products.create");
    return (
      <div className="flex w-full flex-col gap-3">
        <form.Subscribe>
          {(formState) => (
            <Button
              type="button"
              className="w-full sm:max-w-md sm:self-center"
              isLoading={formState.isSubmitting}
              disabled={formState.isSubmitting || !formState.canSubmit}
              onClick={() => {
                void form.setFieldValue("published", true);
                form.handleSubmit();
              }}
            >
              {t("form.savePublish")}
            </Button>
          )}
        </form.Subscribe>
      </div>
    );
  },
});

export function ProductFormActionsSkeleton() {
  return (
    <div className="flex w-full justify-center pt-2 sm:max-w-md sm:self-center">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
