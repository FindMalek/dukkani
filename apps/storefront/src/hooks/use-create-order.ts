"use client";

import type { CreateOrderPublicInput } from "@dukkani/common/schemas/order/input";
import { useMutation } from "@tanstack/react-query";
import { handleAPIError } from "@/shared/api/error-handler";
import { client } from "@/shared/api/orpc";
import { RoutePaths, useRouter } from "@/shared/config/routes";
import { useCartStore } from "@/stores/cart.store";

export function useCreateOrder() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: (input: CreateOrderPublicInput) =>
      client.order.createPublic(input),
    onSuccess: () => {
      // Clear cart for current store
      clearCart();
      // Navigate to success page
      router.push(RoutePaths.CHECKOUT.SUCCESS.url);
    },
    onError: handleAPIError,
  });
}
