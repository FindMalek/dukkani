"use client";

import { createCustomerInputSchema } from "@dukkani/common/schemas/customer/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { appMutations } from "@/shared/api/mutations";
import { RoutePaths } from "@/shared/config/routes";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";

const customerFormSchema = createCustomerInputSchema.omit({ storeId: true });

export default function NewCustomerPage() {
  const t = useTranslations("customers.new");
  const router = useRouter();
  const { selectedStoreId } = useActiveStoreStore();
  const createCustomerMutation = useMutation(appMutations.customer.create());

  const form = useAppForm({
    defaultValues: {
      name: "",
      phone: "",
    },
    validators: {
      onBlur: customerFormSchema,
      onSubmit: customerFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedStoreId) return;
      const parsed = customerFormSchema.parse(value);
      const customer = await createCustomerMutation.mutateAsync({
        ...parsed,
        storeId: selectedStoreId,
      });
      router.push(RoutePaths.CUSTOMERS.DETAIL.url(customer.id));
    },
  });

  return (
    <div className="container mx-auto max-w-lg p-4 md:p-6">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={RoutePaths.CUSTOMERS.INDEX.url}>
            <Icons.arrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-xl">{t("title")}</h1>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
      </div>

      <Form onSubmit={form.handleSubmit}>
        <form.AppForm>
          <FieldGroup>
            <form.AppField name="name">
              {(field) => (
                <field.TextInput
                  label={t("nameLabel")}
                  placeholder={t("namePlaceholder")}
                />
              )}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => (
                <field.TextInput
                  label={t("phoneLabel")}
                  placeholder={t("phonePlaceholder")}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <div className="mt-6 flex gap-2">
            <form.Subscribe>
              {(formState) => (
                <Button
                  type="submit"
                  disabled={!formState.canSubmit || formState.isSubmitting}
                  isLoading={formState.isSubmitting}
                  className="flex-1"
                >
                  {t("submit")}
                </Button>
              )}
            </form.Subscribe>
            <Button variant="outline" type="button" asChild>
              <Link href={RoutePaths.CUSTOMERS.INDEX.url}>{t("cancel")}</Link>
            </Button>
          </div>
        </form.AppForm>
      </Form>
    </div>
  );
}
