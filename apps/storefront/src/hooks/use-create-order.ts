"use client";

import type { CreateOrderPublicInput } from "@dukkani/common/schemas/order/input";
import { useMutation } from "@tanstack/react-query";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";

export function useCreateOrder() {
	const router = useRouter();
	const clearCart = useCartStore((state) => state.clearCart);
	const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

	return useMutation({
		mutationFn: (input: CreateOrderPublicInput) =>
			client.order.createPublic(input),
		onSuccess: () => {
			// Clear cart for current store
			if (currentStoreSlug) {
				clearCart();
			}
			// Navigate to success page
			router.push(RoutePaths.CHECKOUT.SUCCESS.url);
		},
		onError: handleAPIError,
	});
}
