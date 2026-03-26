"use client";

import { subscribeToLaunchInputSchema } from "@dukkani/common/schemas/store/input";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";

interface ComingSoonProps {
  store: StorePublicOutput;
}

const formSchema = subscribeToLaunchInputSchema.omit({ storeId: true });

export function ComingSoon({ store }: ComingSoonProps) {
  const t = useTranslations("storefront.comingSoon");
  const [isSuccess, setIsSuccess] = useState(false);

  const subscribeMutation = useMutation({
    mutationFn: (input: { storeId: string; emailOrPhone: string }) =>
      client.store.subscribeToLaunch(input),
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
    },
    onError: handleAPIError,
  });

  const form = useAppForm({
    defaultValues: {
      emailOrPhone: "",
    },
    validators: {
      onBlur: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = formSchema.parse(value);
      const result = await subscribeMutation.mutateAsync({
        storeId: store.id,
        emailOrPhone: parsed.emailOrPhone,
      });
      return result;
    },
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md">
        {/* Store Name Box */}
        <div className="mb-8 rounded-lg border bg-card p-4 text-center">
          <h1 className="font-bold text-xl">{store.name}</h1>
        </div>

        {/* Main Heading */}
        <h2 className="mb-4 text-center font-bold text-3xl">{t("heading")}</h2>

        {/* Description */}
        <p className="mb-2 text-center text-muted-foreground">
          {t("description.line1")}
        </p>
        <p className="mb-8 text-center text-muted-foreground">
          {t("description.line2")}
        </p>

        {/* Form */}
        {isSuccess ? (
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <p className="text-muted-foreground">{t("success")}</p>
          </div>
        ) : (
          <form.AppForm>
            <Form onSubmit={form.handleSubmit}>
              <FieldGroup>
                <form.AppField name="emailOrPhone">
                  {(field) => (
                    <field.TextInput
                      label={t("input.label")}
                      srOnlyLabel
                      placeholder={t("input.placeholder")}
                    />
                  )}
                </form.AppField>
                <form.Subscribe>
                  {(formState) => (
                    <Button
                      type="submit"
                      disabled={!formState.canSubmit || formState.isSubmitting}
                      isLoading={formState.isSubmitting}
                      className="w-full"
                    >
                      {formState.isSubmitting
                        ? t("button.submitting")
                        : t("button.label")}
                    </Button>
                  )}
                </form.Subscribe>
              </FieldGroup>
            </Form>
          </form.AppForm>
        )}

        {/* Privacy Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Icons.lock className="size-4" />
          <span>{t("privacy")}</span>
        </div>
      </div>
    </div>
  );
}
