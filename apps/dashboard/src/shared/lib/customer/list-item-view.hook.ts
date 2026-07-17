import type { CustomerListItemOutput } from "@dukkani/common/schemas/customer/output";
import { useTranslations } from "next-intl";
import { useFormatOrderRelativeDateTime } from "@/shared/lib/i18n/use-format-order-relative-datetime";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

/**
 * Derives the display strings shared by every customers-list presentation
 * (mobile card, desktop table) from a single {@link CustomerListItemOutput}.
 *
 * Keeps price/date/governorate formatting in one place so the card and
 * table can't drift. `CustomerListItemOutput` only carries the customer's
 * full governorate list (no single "primary" field) — both views show the
 * first entry, matching the existing card behavior.
 */
export function useCustomerListItemView(customer: CustomerListItemOutput) {
  const tGov = useTranslations("customers.list.governorates");
  const formatPrice = useFormatPriceForActiveStore();
  const lastOrderLabel = useFormatOrderRelativeDateTime(
    customer.lastOrderAt ?? undefined,
  );

  const primaryGovernorate = customer.governorates[0];
  const governorateLabel = primaryGovernorate
    ? tGov(primaryGovernorate)
    : undefined;

  return {
    totalSpentLabel: formatPrice(customer.totalSpent),
    lastOrderLabel,
    primaryGovernorate,
    governorateLabel,
  };
}
