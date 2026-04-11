import { orpc } from "./orpc";

export const appQueries = {
  cart: {
    items: orpc.cart.getCartItems.queryOptions,
  },
};
