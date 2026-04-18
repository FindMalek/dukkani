import type { OrderIncludeOutput } from "@dukkani/common/schemas/order/output";

export function getOrderTotal(order: OrderIncludeOutput): number {
  return (
    order.orderItems?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ) ?? 0
  );
}

export function getItemsCount(order: OrderIncludeOutput): number {
  return order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}
