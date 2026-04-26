import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";

export function OrderDetailMetaCards({
  paymentLabel,
  itemsLine,
  columnLabels,
}: {
  paymentLabel: string;
  itemsLine: string;
  columnLabels: { payment: string; items: string };
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className="gap-0 py-0 shadow-sm">
        <div className="flex items-center gap-2.5 p-3">
          <Icons.payments className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs">
              {columnLabels.payment}
            </p>
            <p className="font-semibold text-sm">{paymentLabel}</p>
          </div>
        </div>
      </Card>
      <Card className="gap-0 py-0 shadow-sm">
        <div className="flex items-center gap-2.5 p-3">
          <Icons.package className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs">
              {columnLabels.items}
            </p>
            <p className="font-semibold text-sm">{itemsLine}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
