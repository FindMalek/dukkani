"use client";

import { PaymentMethod } from "@dukkani/common/schemas/enums";
import {
  addressInputSchema,
  createOrderPublicInputSchema,
} from "@dukkani/common/schemas/order/input";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { formatCurrency } from "@dukkani/common/utils/formatCurrency";
import { Button } from "@dukkani/ui/components/button";
import {
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useEffectEvent, useRef } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { useCreateOrder } from "@/hooks/use-create-order";
import { useDetectedAddress } from "@/hooks/use-detected-address";
import { useEnrichedCart } from "@/hooks/use-enriched-cart";
import { RoutePaths, useRouter } from "@/lib/routes";
import { OrderSummary } from "./order-summary";
import { useLocale } from "next-intl";

interface CheckoutFormProps {
  store: StorePublicOutput;
}

const formSchema = createOrderPublicInputSchema
  .omit({
    orderItems: true,
    storeId: true,
  })
  .extend({
    isWhatsApp: z.boolean(),
    address: addressInputSchema
      .omit({ latitude: true, longitude: true })
      .extend({
        postalCode: z.string().transform((val) => val || undefined),
      }),
    notes: z.string().transform((val) => val || undefined),
  });

export function CheckoutForm({ store }: CheckoutFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("storefront.store.checkout");

  const hydrated = useCartHydration();
  const autoLocation = useDetectedAddress();
  const createOrderMutation = useCreateOrder();
  const {
    cartItems,
    enrichedData,
    subtotal,
    isLoading: cartQueryLoading,
  } = useEnrichedCart();

  const detectedCoordsRef = useRef<{
    latitude?: number;
    longitude?: number;
  }>({});

  // Redirect if cart is empty (but not when we just completed an order)
  // Wait for cart rehydration so we don't redirect before persisted cart is loaded
  useEffect(() => {
    if (!hydrated) return;
    if (cartItems.length === 0 && !createOrderMutation.isSuccess) {
      router.push(RoutePaths.HOME.url);
    }
  }, [hydrated, cartItems.length, createOrderMutation.isSuccess, router]);

  const total = subtotal + store.shippingCost;

  useEffect(() => {
    if (autoLocation.error) {
      toast.error(t("delivery.locationErrorTitle"), {
        description: t("delivery.locationErrorDescription"),
      });
    }
  }, [autoLocation.error, t]);

  const form = useAppForm({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      isWhatsApp: false,
      address: {
        street: "",
        city: "",
        postalCode: "",
      },
      paymentMethod: store.supportedPaymentMethods[0] || PaymentMethod.COD,
      notes: "",
    },
    validators: {
      onBlur: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { data, success } = formSchema.safeParse(value);
      if (!success || !data) {
        return;
      }
      if (!enrichedData || enrichedData.length === 0) {
        return;
      }
      const orderItems = enrichedData.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const c = detectedCoordsRef.current;
      const coords =
        typeof c.latitude === "number" &&
        typeof c.longitude === "number" &&
        Number.isFinite(c.latitude) &&
        Number.isFinite(c.longitude)
          ? { latitude: c.latitude, longitude: c.longitude }
          : {};

      await createOrderMutation.mutateAsync({
        ...data,
        address: { ...data.address, ...coords },
        storeId: store.id,
        orderItems,
      });
    },
  });

  const updateDetectedPostalCode = useEffectEvent((postalCode: string) => {
    form.setFieldValue("address.postalCode", postalCode);
  });
  const updateDetectedCity = useEffectEvent((city: string) => {
    form.setFieldValue("address.city", city);
  });
  const updateDetectedStreet = useEffectEvent((street: string) => {
    form.setFieldValue("address.street", street);
  });

  useEffect(() => {
    if (!autoLocation.isSuccess || autoLocation.dataUpdatedAt === 0) return;
    const d = autoLocation.data;
    updateDetectedPostalCode(d.postCode);
    updateDetectedCity(d.city);
    updateDetectedStreet(d.street);
    const lat = Number.parseFloat(d.latitude);
    const lon = Number.parseFloat(d.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      detectedCoordsRef.current = { latitude: lat, longitude: lon };
    } else {
      detectedCoordsRef.current = {};
    }
  }, [autoLocation.isSuccess, autoLocation.dataUpdatedAt, autoLocation.data]);

  const handleDetectLocation = useCallback(async () => {
    await autoLocation.detect();
  }, [autoLocation, autoLocation.detect]);

  return (
    <Form
      onSubmit={form.handleSubmit}
      className="mx-auto max-w-md md:max-w-2xl px-4"
    >
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="customerName">
            {(field) => <field.TextInput label={t("delivery.fullName")} />}
          </form.AppField>
          <form.AppField name="customerPhone">
            {(field) => (
              <field.PhoneNumberInput
                label={t("delivery.phone")}
                defaultCountry="TN"
              />
            )}
          </form.AppField>
          <form.AppField name="isWhatsApp">
            {(field) => (
              <field.CheckboxInput
                variant="card"
                leadingVisual={<Icons.whatsapp />}
                label={t("delivery.whatsapp")}
                description={t("delivery.whatsappDescription")}
              />
            )}
          </form.AppField>
          <FieldSet>
            <FieldGroup className="gap-6">
              <form.AppField name="address.street">
                {(field) => (
                  <field.TextInput label={t("delivery.streetAddress")} />
                )}
              </form.AppField>
              <div className="grid grid-cols-2 gap-4">
                <form.AppField name="address.city">
                  {(field) => <field.TextInput label={t("delivery.city")} />}
                </form.AppField>
                <form.AppField name="address.postalCode">
                  {(field) => (
                    <field.TextInput label={t("delivery.postalCode")} />
                  )}
                </form.AppField>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={createOrderMutation.isPending}
                  isLoading={autoLocation.isFetching}
                  onClick={handleDetectLocation}
                >
                  <Icons.mapPin
                    className="size-5 shrink-0 text-foreground"
                    aria-hidden
                  />
                  {t("delivery.useLocation")}
                </Button>
              </div>
            </FieldGroup>
          </FieldSet>
          <form.AppField name="paymentMethod">
            {(field) => (
              <field.RadioGroupInput
                label={t("payment.title")}
                as="cards"
                options={[
                  {
                    label: t("payment.cod"),
                    value: PaymentMethod.COD,
                  },
                  {
                    label: t("payment.creditCard"),
                    value: PaymentMethod.CARD,
                    disabled: !store.supportedPaymentMethods.includes(
                      PaymentMethod.CARD,
                    ),
                    description: !store.supportedPaymentMethods.includes(
                      PaymentMethod.CARD,
                    )
                      ? t("payment.comingSoon")
                      : undefined,
                  },
                ]}
              />
            )}
          </form.AppField>
          <form.AppField name="notes">
            {(field) => (
              <field.TextAreaInput
                label={t("delivery.instructions")}
                rows={3}
              />
            )}
          </form.AppField>
          <FieldSeparator />
          <OrderSummary
            items={enrichedData ?? []}
            shippingCost={store.shippingCost}
            loading={cartQueryLoading || !enrichedData}
          />
        </FieldGroup>
        <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background px-4 py-3">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <form.Subscribe>
              {(formState) => (
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground"
                  size="lg"
                  disabled={
                    formState.isSubmitting ||
                    enrichedData?.length === 0 ||
                    !formState.canSubmit
                  }
                  isLoading={formState.isSubmitting}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.shoppingCart className="size-4" />
                      <span>{t("placeOrder")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-semibold text-sm tabular-nums"
                        dir="ltr"
                      >
                        {formatCurrency(total, "TND", locale)}
                      </span>
                      <Icons.arrowRight className="size-4 rtl:rotate-180" />
                    </div>
                  </div>
                </Button>
              )}
            </form.Subscribe>
          </div>
        </div>
      </form.AppForm>
    </Form>
  );
}
