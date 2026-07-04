"use client";

import type { CustomerListItemOutput } from "@dukkani/common/schemas/customer/output";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { exportCustomersToCsv } from "@/shared/lib/customer/customer-csv-export.util";
import { getContactHref } from "@/shared/lib/phone/contact-href.util";

interface CustomersListSelectionBarProps {
  selectedCustomers: CustomerListItemOutput[];
  onCancel: () => void;
}

export function CustomersListSelectionBar({
  selectedCustomers,
  onCancel,
}: CustomersListSelectionBarProps) {
  const t = useTranslations("customers.list");
  const count = selectedCustomers.length;
  const canMessage = count === 1;

  const handleExport = () => {
    exportCustomersToCsv(selectedCustomers);
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
        <span className="shrink-0 font-medium text-sm">
          {t("itemsSelected", { count })}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} disabled={count === 0}>
            <Icons.download className="size-4" />
            {t("exportCsv")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMessage}
            disabled={!canMessage}
          >
            <Icons.whatsapp className="size-4" />
            {t("messageOnWhatsApp")}
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            {t("cancelSelection")}
          </Button>
        </div>
      </div>
    </div>
  );
}
