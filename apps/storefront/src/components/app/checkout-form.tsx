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
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useEffectEvent, useMemo } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { useCreateOrder } from "@/hooks/use-create-order";
import { useDetectedAddress } from "@/hooks/use-detected-address";
import { orpc } from "@/lib/orpc";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";
import { OrderSummary } from "./order-summary";

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
  const t = useTranslations("storefront.store.checkout");

  const autoLocation = useDetectedAddress();
  const hydrated = useCartHydration();
  const createOrderMutation = useCreateOrder();
  const carts = useCartStore((state) => state.carts);
  const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

  const cartItems = useMemo(() => {
    if (!currentStoreSlug) return [];
    return carts[currentStoreSlug] || [];
  }, [carts, currentStoreSlug]);

  // Redirect if cart is empty (but not when we just completed an order)
  // Wait for cart rehydration so we don't redirect before persisted cart is loaded
  useEffect(() => {
    if (!hydrated) return;
    if (cartItems.length === 0 && !createOrderMutation.isSuccess) {
      router.push(RoutePaths.HOME.url);
    }
  }, [hydrated, cartItems.length, createOrderMutation.isSuccess, router]);

  const queryInput = useMemo(() => {
    return {
      items: cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    };
  }, [cartItems]);

  const enrichedCartItems = useQuery({
    ...orpc.cart.getCartItems.queryOptions({
      input: queryInput,
    }),
    enabled: cartItems.length > 0,
    staleTime: 30 * 1000,
  });

  const enrichedData = useMemo(() => {
    if (!enrichedCartItems.data) return undefined;
    if (cartItems.length === 0) return [];

    const filteredData = enrichedCartItems.data.filter((enrichedItem) => {
      return cartItems.some(
        (item) =>
          item.productId === enrichedItem.productId &&
          item.variantId === enrichedItem.variantId,
      );
    });

    return filteredData.map((enrichedItem) => {
      const currentItem = cartItems.find(
        (item) =>
          item.productId === enrichedItem.productId &&
          item.variantId === enrichedItem.variantId,
      );
      return {
        ...enrichedItem,
        quantity: currentItem?.quantity ?? enrichedItem.quantity,
      };
    });
  }, [enrichedCartItems.data, cartItems]);

  const subtotal =
    enrichedData?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) ?? 0;
  const total = subtotal + store.shippingCost;
  const formattedTotal = total.toFixed(3);

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

      await createOrderMutation.mutateAsync({
        ...data,
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
    if (autoLocation.data) {
      updateDetectedPostalCode(autoLocation.data.postCode);
      updateDetectedCity(autoLocation.data.city);
      updateDetectedStreet(autoLocation.data.street);
    }
  }, [autoLocation.data]);

  const handleDetectLocation = useCallback(async () => {
    await autoLocation.detect();
  }, [autoLocation, autoLocation.detect]);

  return (
    <Form
      onSubmit={form.handleSubmit}
      className="mx-auto max-w-md md:max-w-2xl"
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
                label={
                  <>
                    <Icons.whatsapp />
                    <span>{t("delivery.whatsapp")}</span>
                  </>
                }
                description={t("delivery.whatsappDescription")}
              />
            )}
          </form.AppField>
          <FieldSet className="rounded-md border p-4">
            <FieldLegend>{t("delivery.addressFieldset.title")}</FieldLegend>
            <FieldDescription>
              {t("delivery.addressFieldset.description")}
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="address.street">
                {(field) => (
                  <field.TextInput label={t("delivery.streetAddress")} />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.AppField name="address.city">
                  {(field) => <field.TextInput label={t("delivery.city")} />}
                </form.AppField>
                <form.AppField name="address.postalCode">
                  {(field) => (
                    <field.TextInput label={t("delivery.postalCode")} />
                  )}
                </form.AppField>
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={createOrderMutation.isPending}
                isLoading={autoLocation.isLoading}
                onClick={handleDetectLocation}
              >
                {t("delivery.useLocation")}
              </Button>
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
            loading={enrichedCartItems.isLoading || !enrichedData}
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
                        {formatCurrency(total)}
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
