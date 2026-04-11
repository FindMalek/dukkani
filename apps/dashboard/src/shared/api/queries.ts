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
    stats: api.dashboard.getStats.queryOptions,
  },
  telegram: {
    status: api.telegram.getStatus.queryOptions,
    botLink: api.telegram.getBotLink.queryOptions,
  },
};

/**
 * Extract the resolved data type from any appQueries factory function.
 *
 * @example
 * type ProductList = QueryData<typeof appQueries.product.all>
 * type CurrentUser = QueryData<typeof appQueries.account.currentUser>
 * type StoreList   = QueryData<typeof appQueries.store.all>
 */
export type QueryData<
  T extends (...args: any[]) => { queryFn: () => Promise<any> },
> = Awaited<ReturnType<ReturnType<T>["queryFn"]>>;
