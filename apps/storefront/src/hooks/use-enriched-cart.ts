"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getItemKey } from "@/lib/cart-utils";
import { orpc } from "@/lib/orpc";
import { useCartStore } from "@/stores/cart.store";

export interface UseEnrichedCartOptions {
  /**
   * When false, the query does not run even if the cart has items (e.g. drawer closed).
   * Defaults to true.
   */
  enabled?: boolean;
}

/**
 * Current cart lines from the store plus server-enriched rows (prices, names, stock).
 * Query input identity is stable when only quantities change (same product/variant keys),
 * so we avoid refetching; live quantities come from the Zustand merge step.
 */
export function useEnrichedCart(options: UseEnrichedCartOptions = {}) {
  const { enabled = true } = options;

  const carts = useCartStore((state) => state.carts);
  const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

  const cartItems = useMemo(() => {
    if (!currentStoreSlug) return [];
    return carts[currentStoreSlug] || [];
  }, [carts, currentStoreSlug]);

  const itemKeysString = useMemo(() => {
    return cartItems.map(getItemKey).sort().join(",");
  }, [cartItems]);

  const queryInput = useMemo(() => {
    return {
      items: cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    };
  }, [itemKeysString]);

  const query = useQuery({
    ...orpc.cart.getCartItems.queryOptions({
      input: queryInput,
    }),
    enabled: enabled && cartItems.length > 0,
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });

  const enrichedData = useMemo(() => {
    if (!query.data) return undefined;
    if (cartItems.length === 0) return [];

    const filteredData = query.data.filter((enrichedItem) => {
      return cartItems.some(
        (item) =>
          item.productId === enrichedItem.productId &&
          item.variantId === enrichedItem.variantId,
      );
    });

    return filteredData.map((enrichedItem) => {
      const currentItem = cartItems.find(
        (item) =>
          item.productId === enrichedItem.productId &&
          item.variantId === enrichedItem.variantId,
      );
      return {
        ...enrichedItem,
        quantity: currentItem?.quantity ?? enrichedItem.quantity,
      };
    });
  }, [query.data, cartItems]);

  const subtotal =
    enrichedData?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) ?? 0;

  return {
    cartItems,
    enrichedData,
    subtotal,
    isLoading: query.isLoading,
  };
}
