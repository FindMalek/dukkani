import { Badge } from "@dukkani/ui/components/badge";
import { cn } from "@dukkani/ui/lib/utils";
import type { ComponentProps } from "react";

export function OrderDetailSummary({
  statusLabel,
  totalFormatted,
  orderId,
  orderMetaLine,
  badgeVariant,
  className,
}: {
  statusLabel: string;
  totalFormatted: string;
  orderId: string;
  orderMetaLine: string;
  badgeVariant: NonNullable<ComponentProps<typeof Badge>["variant"]>;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-0.5 py-6", className)}>
      <Badge className="xl:hidden" variant={badgeVariant}>
        {statusLabel}
      </Badge>
      <p className="font-bold text-4xl tracking-tight">{totalFormatted}</p>
      <p className="mt-1 text-muted-foreground text-xs">
        #{orderId} · {orderMetaLine}
      </p>
    </div>
  );
}
