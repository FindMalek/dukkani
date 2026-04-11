import { orpc } from "./orpc";

export const appQueries = {
  cart: {
    items: orpc.cart.getCartItems.queryOptions,
  },
};

/**
 * Extract the resolved data type from any appQueries factory function.
 *
 * @example
 * type CartItems = QueryData<typeof appQueries.cart.items>
 */
export type QueryData<
  T extends (...args: any[]) => { queryFn: () => Promise<any> },
> = Awaited<ReturnType<ReturnType<T>["queryFn"]>>;
