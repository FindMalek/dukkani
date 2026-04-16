"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import { storeNotificationMethodEnum } from "@dukkani/common/schemas/enums";
import {
  type CreateStoreOnboardingInput,
  createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
  DefaultCurrency,
  SupportedCurrencies,
  SupportedCurrency,
} from "@dukkani/i18n";
import { Button } from "@dukkani/ui/components/button";
import { FlagComponent } from "@dukkani/ui/components/country";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { useT } from "next-i18next/client";
import { useMemo } from "react";

export const storeSetupFormDefaultOptions = formOptions({
  defaultValues: {
    name: "",
    description: "",
    currency: DefaultCurrency,
    notificationMethod: storeNotificationMethodEnum.EMAIL,
  } as CreateStoreOnboardingInput,
  validators: {
    onBlur: createStoreOnboardingInputSchema,
    onSubmit: createStoreOnboardingInputSchema,
  },
});

export const StoreSetupOnboardingForm = withForm({
  ...storeSetupFormDefaultOptions,
  render: function RenderForm({ form }) {
    const { t } = useT("pages", { keyPrefix: "onboarding.storeSetup" });

    const { t: tNotifications } = useT("pages", {
      keyPrefix: "onboarding.storeSetup.notifications.options",
    });
    const notificationMethodOptions = useMemo(
      () => [
        {
          ...tNotifications("email", { returnObjects: true }),
          value: storeNotificationMethodEnum.EMAIL,
        },
        {
          ...tNotifications("telegram", { returnObjects: true }),
          value: storeNotificationMethodEnum.TELEGRAM,
        },
        {
          ...tNotifications("both", { returnObjects: true }),
          value: storeNotificationMethodEnum.BOTH,
        },
      ],
      [tNotifications],
    );
    const currenciesOptions = useMemo(
      () => [
        {
          id: "currency",
          options: Object.values(SupportedCurrencies).map((currency) => ({
            id: currency,
            name: <CurrencySelectOption currency={currency} />,
            value: currency,
          })),
        },
      ],
      [],
    );
    return (
      <>
        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Form onSubmit={form.handleSubmit}>
          <form.AppForm>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.TextInput
                    label={t("storeName.label")}
                    placeholder={t("storeName.placeholder")}
                    autoFocus
                    autoComplete="off"
                  />
                )}
              </form.AppField>
              <form.AppField name="currency">
                {(field) => (
                  <field.SelectInput
                    label={t("currency.label")}
                    options={currenciesOptions}
                    noReset
                    placeholder={t("currency.placeholder")}
                  />
                )}
              </form.AppField>
              <form.AppField name="notificationMethod">
                {(field) => (
                  <field.RadioGroupInput
                    label={t("notifications.label")}
                    as="cards"
                    options={notificationMethodOptions}
                  />
                )}
              </form.AppField>
              <form.Subscribe>
                {(formState) => (
                  <Button
                    type="submit"
                    disabled={formState.isSubmitting || !formState.canSubmit}
                    isLoading={formState.isSubmitting}
                  >
                    {t("submit")}
                  </Button>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form.AppForm>
        </Form>
      </>
    );
  },
});

function CurrencySelectOption({ currency }: { currency: SupportedCurrency }) {
  const { t } = useT("ui");
  const currencyData = t("currencies", { returnObjects: true })[currency];
  return (
    <span className="flex flex-row items-center justify-between gap-3">
      <FlagComponent
        country={currencyData.region.code}
        countryName={currencyData.region.name}
      />
      <span className="flex items-center gap-2">
        <span>{currencyData.label}</span>
        <span className="text-muted-foreground text-sm">{currency}</span>
      </span>
    </span>
  );
}
