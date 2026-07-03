import { accountRouter } from "./account";
import { bundleRouter } from "./bundle";
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
  bundle: bundleRouter,
  order: orderRouter,
  account: accountRouter,
  category: categoryRouter,
  collection: collectionRouter,
  cart: cartRouter,
};
