"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { appQueries } from "@/shared/api/queries";
import { useCartStore } from "@/shared/lib/cart/store";
import { getItemKey } from "./item-comparator";

/**
 * Current cart lines from the store plus server-enriched rows (prices, names, stock).
 * Quantities are merged from Zustand into `enrichedData` so the UI stays in sync.
 */
export function useEnrichedCart(enabled = true) {
  const carts = useCartStore((state) => state.carts);
  const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

  const cartItems = useMemo(() => {
    if (!currentStoreSlug) return [];
    return carts[currentStoreSlug] || [];
  }, [carts, currentStoreSlug]);

  const queryInput = useMemo(
    () => ({
      items: cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    }),
    [cartItems],
  );

  const query = useQuery(
    appQueries.cart.items({
      input: queryInput,
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
      enabled: enabled && cartItems.length > 0,
    }),
  );

  const enrichedData = useMemo(() => {
    if (!query.data) return undefined;
    if (cartItems.length === 0) return [];

    const filteredData = query.data.filter((enrichedItem) => {
      return cartItems.some(
        (item) => getItemKey(item) === getItemKey(enrichedItem),
      );
    });

    return filteredData.map((enrichedItem) => {
      const currentItem = cartItems.find(
        (item) => getItemKey(item) === getItemKey(enrichedItem),
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
