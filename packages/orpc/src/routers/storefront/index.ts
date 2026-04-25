import { accountRouter } from "./account";
import { cartRouter } from "./cart";
import { categoryRouter } from "./category";
import { collectionRouter } from "./collection";
import { healthRouter } from "./health";
import { orderRouter } from "./order";
import { productRouter } from "./product";
import { storeRouter } from "./store";

export const storefrontRouter = {
  health: healthRouter,
  store: storeRouter,
  product: productRouter,
  order: orderRouter,
  account: accountRouter,
  category: categoryRouter,
  collection: collectionRouter,
  cart: cartRouter,
};
