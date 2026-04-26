import { AddressEntity } from "@dukkani/common/entities/address/entity";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";

export function OrderDetailDeliveryCard({
  city,
  postalCode,
  street,
  notes,
  labels,
}: {
  city: string;
  postalCode: string | null | undefined;
  street: string;
  notes: string | null | undefined;
  labels: { deliveryAddress: string };
}) {
  const headline =
    AddressEntity.formatOrderListLocation({
      city,
      postalCode: postalCode ?? null,
    }) ?? city;
  return (
    <Card className="gap-0 py-0 shadow-sm">
      <div className="space-y-1.5 p-3">
        <p className="font-medium text-muted-foreground text-xs">
          {labels.deliveryAddress}
        </p>
        <div className="flex gap-2">
          <Icons.mapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-semibold text-sm">{headline}</p>
            <p className="text-muted-foreground text-sm">{street}</p>
          </div>
        </div>
        {notes && (
          <div className="flex gap-1.5 rounded-lg bg-muted/50 p-2">
            <Icons.fileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm italic">"{notes}"</p>
          </div>
        )}
      </div>
    </Card>
  );
}
