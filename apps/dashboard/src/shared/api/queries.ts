import { orpc } from "./orpc";

export const appQueries = {
  account: {
    currentUser: orpc.account.getCurrentUser.queryOptions,
  },
  category: {
    all: orpc.category.getAll.queryOptions,
    byId: orpc.category.getById.queryOptions,
  },
  order: {
    all: orpc.order.getAll.queryOptions,
    byId: orpc.order.getById.queryOptions,
  },
  product: {
    all: orpc.product.getAll.queryOptions,
    byId: orpc.product.getById.queryOptions,
  },
  store: {
    all: orpc.store.getAll.queryOptions,
    byId: orpc.store.getById.queryOptions,
    stats: orpc.store.getStats.queryOptions,
  },
  telegram: {
    status: orpc.telegram.getStatus.queryOptions,
    botLink: orpc.telegram.getBotLink.queryOptions,
  },
};
