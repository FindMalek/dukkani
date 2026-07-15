"use client";

import { createCategoryInputSchema } from "@dukkani/common/schemas/category/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import {
  ResponsivePopover,
  ResponsivePopoverContent,
  ResponsivePopoverTrigger,
} from "@dukkani/ui/components/responsive-popover";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { appMutations } from "@/shared/api/mutations";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";

interface CategoryDrawerProps {
  trigger: ReactNode;
  onCategoryCreated?: (categoryId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryFormSchema = createCategoryInputSchema.omit({ storeId: true });

export function CategoryDrawer({
  trigger,
  onCategoryCreated,
  open,
  onOpenChange,
}: CategoryDrawerProps) {
  const t = useTranslations("products.create");
  const { selectedStoreId } = useActiveStoreStore();
  const createCategoryMutation = useMutation(appMutations.category.create());

  if (!selectedStoreId) {
    return null;
  }

  const form = useAppForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onBlur: categoryFormSchema,
      onSubmit: categoryFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const parsed = categoryFormSchema.parse(value);
      const result = await createCategoryMutation.mutateAsync(
        { ...parsed, storeId: selectedStoreId },
        {
          onSuccess: (data) => {
            formApi.reset();
            onOpenChange(false);
            onCategoryCreated?.(data.id);
          },
        },
      );
      return result;
    },
  });

  return (
    <ResponsivePopover open={open} onOpenChange={onOpenChange}>
      <ResponsivePopoverTrigger asChild>{trigger}</ResponsivePopoverTrigger>
      <ResponsivePopoverContent className="w-96 max-w-md">
        <div className="flex flex-col gap-0.5 border-b p-4">
          <p className="font-semibold text-foreground">
            {t("form.category.create")}
          </p>
          <p className="text-muted-foreground text-sm">
            {t("form.category.createDescription")}
          </p>
        </div>
        <div className="px-6 py-4">
          <Form onSubmit={form.handleSubmit}>
            <form.AppForm>
              <FieldGroup>
                <form.AppField name="name">
                  {(field) => (
                    <field.TextInput
                      label={t("form.category.nameLabel")}
                      placeholder={t("form.category.namePlaceholder")}
                    />
                  )}
                </form.AppField>
              </FieldGroup>
              <div className="mt-4 flex flex-col gap-2">
                <form.Subscribe>
                  {(formState) => (
                    <>
                      <Button
                        type="submit"
                        disabled={
                          !formState.canSubmit || formState.isSubmitting
                        }
                        isLoading={formState.isSubmitting}
                      >
                        {t("form.category.create")}
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => onOpenChange(false)}
                      >
                        {t("form.cancel")}
                      </Button>
                    </>
                  )}
                </form.Subscribe>
              </div>
            </form.AppForm>
          </Form>
        </div>
      </ResponsivePopoverContent>
    </ResponsivePopover>
  );
}
