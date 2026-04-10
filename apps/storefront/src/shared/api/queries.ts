import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { client } from "./orpc";

export const appQueries = {
  cart: {
    items: (data: Parameters<typeof client.cart.getCartItems>["0"]) =>
      queryOptions({
        queryKey: [
          "cart",
          "items",
          data.items
            .map(
              (item) => `${item.productId}-${item.variantId ?? "no-variant"}`,
            )
            .join(","),
        ],
        queryFn: async () => client.cart.getCartItems(data),
        staleTime: 30 * 1000, // 30 seconds
        placeholderData: keepPreviousData,
      }),
  },
};
