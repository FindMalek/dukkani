import { orpc } from "./orpc";

export const appQueries = {
  cart: {
    items: orpc.cart.getCartItems.queryOptions,
  },
  category: {
    getAll: orpc.category.getAllPublic.queryOptions,
  },
  product: {
    getAll: orpc.product.getAllPublic.queryOptions,
    getPriceBounds: orpc.product.getPriceBoundsPublic.queryOptions,
  },
};
