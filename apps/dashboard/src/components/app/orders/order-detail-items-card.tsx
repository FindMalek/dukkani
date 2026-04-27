import type { OrderIncludeOutput } from "@dukkani/common/schemas/order/output";
import { Card } from "@dukkani/ui/components/card";
import Image from "next/image";
import { Icons } from "@dukkani/ui/components/icons";
import { Separator } from "@dukkani/ui/components/separator";

type LineItem = NonNullable<OrderIncludeOutput["orderItems"]>[number];

export function OrderDetailItemsCard({
  orderItems,
  subtotal,
  deliveryFee,
  total,
  formatPrice,
  labels,
  itemCountLine,
}: {
  orderItems: LineItem[] | undefined;
  subtotal: number;
  deliveryFee: number;
  total: number;
  formatPrice: (n: number) => string;
  labels: {
    orderItems: string;
    subtotal: string;
    delivery: string;
    total: string;
  };
  itemCountLine: (quantity: number) => string;
}) {
  return (
    <Card className="gap-0 py-0 shadow-sm">
      <div className="p-3">
        <p className="mb-1.5 font-medium text-muted-foreground text-xs">
          {labels.orderItems}
        </p>
        <div className="divide-y divide-border">
          {orderItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 py-2 first:pt-0 last:pb-0"
            >
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                {item.product?.imageUrl ? (
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name ?? ""}
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                ) : (
                  <Icons.orderItem className="size-4 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">
                  {item.product?.name ?? "—"}
                </p>
                {item.displayAttributes && item.displayAttributes.length > 0 ? (
                  <p className="line-clamp-2 text-muted-foreground text-xs">
                    {item.displayAttributes
                      .map((a) => `${a.optionName}: ${a.value}`)
                      .join(" · ")}
                  </p>
                ) : null}
                <p className="text-muted-foreground text-xs">
                  {itemCountLine(item.quantity)}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-sm">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-2 h-0 border-border border-t border-dashed bg-transparent" />

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{labels.subtotal}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{labels.delivery}</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <span>{labels.total}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
