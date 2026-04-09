import { api } from "./orpc";

// const api = api.dashboard;

export const appQueries = {
  account: {
    currentUser: api.account.getCurrentUser.queryOptions,
  },
  category: {
    all: api.category.getAll.queryOptions,
    byId: api.category.getById.queryOptions,
  },
  dashboard: {
    stats: api.dashboard.getStats.queryOptions,
  },
  order: {
    all: api.order.getAll.queryOptions,
    byId: api.order.getById.queryOptions,
  },
  product: {
    all: api.product.getAll.queryOptions,
    byId: api.product.getById.queryOptions,
  },
  store: {
    all: api.store.getAll.queryOptions,
    byId: api.store.getById.queryOptions,
  },
  telegram: {
    status: api.telegram.getStatus.queryOptions,
    botLink: api.telegram.getBotLink.queryOptions,
  },
};
