import type { CustomerIncludeOutput } from "@dukkani/common/schemas/customer/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

interface CustomerDetailLocationsCardProps {
  addresses: CustomerIncludeOutput["addresses"];
}

export function CustomerDetailLocationsCard({
  addresses,
}: CustomerDetailLocationsCardProps) {
  const t = useTranslations("customers.detail.locations");
  const tGov = useTranslations("customers.list.governorates");

  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm">
      <p className="mb-2 font-medium text-muted-foreground text-xs">
        {t("title")}
      </p>
      {addresses.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("empty")}</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div key={address.id} className="flex items-start gap-2">
              <Icons.mapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm">
                    {address.street}, {address.city}
                  </p>
                  {address.governorate && (
                    <Badge variant="outline" className="shrink-0 font-normal">
                      {tGov(address.governorate)}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">
                  {t("ordersCount", { count: address.orderCount })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
