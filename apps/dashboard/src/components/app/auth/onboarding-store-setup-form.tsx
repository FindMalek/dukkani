"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
  LIST_SUPPORTED_CURRENCIES,
  SupportedCurrency,
  storeNotificationMethodEnum,
} from "@dukkani/common/schemas/enums";
import {
  type CreateStoreOnboardingInput,
  createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import { FlagComponent } from "@dukkani/ui/components/country";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const storeSetupFormDefaultOptions = formOptions({
  defaultValues: {
    name: "",
    description: "",
    currency: SupportedCurrency.TND,
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
    const t = useTranslations("onboarding.storeSetup");
    const notificationMethodOptions = useMemo(
      () => [
        {
          label: t("notifications.options.email.label"),
          description: t("notifications.options.email.description"),
          value: storeNotificationMethodEnum.EMAIL,
        },
        {
          label: t("notifications.options.telegram.label"),
          description: t("notifications.options.telegram.description"),
          value: storeNotificationMethodEnum.TELEGRAM,
        },
        {
          label: t("notifications.options.both.label"),
          description: t("notifications.options.both.description"),
          value: storeNotificationMethodEnum.BOTH,
        },
      ],
      [t],
    );
    const currenciesOptions = useMemo(
      () => [
        {
          id: "currency",
          options: LIST_SUPPORTED_CURRENCIES.map((currency) => ({
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

function useCurrencyInformation(currency: SupportedCurrency) {
  const t = useTranslations("currencies");
  return useMemo(
    () => ({
      countryCode: StoreEntity.getCurrencyCountryCode(currency),
      countryName: t(StoreEntity.getCurrencyCountryNameKey(currency)),
      name: t(StoreEntity.getCurrencyNameKey(currency)),
    }),
    [currency, t],
  );
}

function CurrencySelectOption({ currency }: { currency: SupportedCurrency }) {
  const currencyInformation = useCurrencyInformation(currency);
  return (
    <span className="flex flex-row items-center justify-between gap-3">
      <FlagComponent
        country={currencyInformation.countryCode}
        countryName={currencyInformation.countryName}
      />
      <span className="flex items-center gap-2">
        <span>{currencyInformation.name}</span>
        <span className="text-muted-foreground text-sm">{currency}</span>
      </span>
    </span>
  );
}
