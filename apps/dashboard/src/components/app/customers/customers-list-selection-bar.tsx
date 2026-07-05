"use client";

import type { CustomerListItemOutput } from "@dukkani/common/schemas/customer/output";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { exportCustomersToCsv } from "@/shared/lib/customer/customer-csv-export.util";
import { getContactHref } from "@/shared/lib/phone/contact-href.util";
import { useCurrentStoreCurrency } from "@/shared/lib/store/current-currency.hook";

interface CustomersListSelectionBarProps {
  selectedCustomers: CustomerListItemOutput[];
  onCancel: () => void;
}

export function CustomersListSelectionBar({
  selectedCustomers,
  onCancel,
}: CustomersListSelectionBarProps) {
  const t = useTranslations("customers.list");
  const currency = useCurrentStoreCurrency();
  const count = selectedCustomers.length;
  const canMessage = count === 1;

  const handleExport = () => {
    exportCustomersToCsv(selectedCustomers, currency);
  };

  const handleMessage = () => {
    if (!canMessage) {
      toast.error(t("selectExactlyOne"));
      return;
    }
    const customer = selectedCustomers[0];
    if (!customer) return;
    window.location.href = getContactHref(
      customer.phone,
      true,
      t("waPrefill", { name: customer.name }),
    );
  };

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 border-t bg-background/95 p-3 backdrop-blur-sm md:bottom-0">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-2">
        <span className="min-w-0 shrink font-medium text-sm">
          {t("itemsSelected", { count })}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleExport}
            disabled={count === 0}
            aria-label={t("exportCsv")}
          >
            <Icons.download className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleMessage}
            disabled={!canMessage}
            aria-label={t("messageOnWhatsApp")}
          >
            <Icons.whatsapp className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            aria-label={t("cancelSelection")}
          >
            <Icons.x className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
