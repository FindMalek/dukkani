"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { appQueries } from "@/shared/api/queries";
import { useCartStore } from "@/shared/lib/cart/store";
import { getItemKey } from "./item-comparator";

/**
 * Current cart lines from the store plus server-enriched rows (prices, names, stock).
 * Query input identity is stable when only quantities change (same product/variant keys),
 * so we avoid refetching; live quantities come from the Zustand merge step.
 */
export function useEnrichedCart(enabled = true) {
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
    return cartItems.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
    }));
  }, [itemKeysString]);

  const query = useQuery(
    appQueries.cart.items({
      input: { items: queryInput },
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
