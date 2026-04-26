"use client";

import { OrderListCard } from "@/components/app/orders/order-list-card";
import type { OrderListDisplaySection } from "@/shared/lib/order/order.util";

export function OrdersGroupedList({
  sections,
}: {
  sections: OrderListDisplaySection[];
}) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section key={section.key}>
          <h2 className="mb-3 font-medium text-muted-foreground text-sm">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.orders.map((order) => (
              <OrderListCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
