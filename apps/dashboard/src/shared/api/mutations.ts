import { api } from "./orpc";

// export const api = api.dashboard;

export const appMutations = {
  category: {
    create: (
      options?: Parameters<typeof api.category.create.mutationOptions>[0],
    ) =>
      api.category.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.category.getAll.queryOptions({
              input: { storeId: data.storeId },
            }),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    update: (
      options?: Parameters<typeof api.category.update.mutationOptions>[0],
    ) =>
      api.category.update.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.category.getAll.queryOptions({
              input: { storeId: data.storeId },
            }),
          );
          await context.client.invalidateQueries(
            api.category.getById.queryOptions({ input: { id: data.id } }),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    delete: (
      options?: Parameters<typeof api.category.delete.mutationOptions>[0],
    ) =>
      api.category.delete.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.category.getAll.queryOptions({
              input: { storeId: data.storeId },
            }),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  order: {
    create: (
      options?: Parameters<typeof api.order.create.mutationOptions>[0],
    ) =>
      api.order.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.order.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    updateStatus: (
      options?: Parameters<typeof api.order.updateStatus.mutationOptions>[0],
    ) =>
      api.order.updateStatus.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.order.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.order.getById.queryOptions({ input: { id: data.id } }),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    delete: (
      options?: Parameters<typeof api.order.delete.mutationOptions>[0],
    ) =>
      api.order.delete.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.order.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  product: {
    create: (
      options?: Parameters<typeof api.product.create.mutationOptions>[0],
    ) =>
      api.product.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    update: (
      options?: Parameters<typeof api.product.update.mutationOptions>[0],
    ) =>
      api.product.update.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.product.getById.queryOptions({ input: { id: data.id } }),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    delete: (
      options?: Parameters<typeof api.product.delete.mutationOptions>[0],
    ) =>
      api.product.delete.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    togglePublished: (
      options?: Parameters<typeof api.product.togglePublish.mutationOptions>[0],
    ) =>
      api.product.togglePublish.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            api.product.getById.queryOptions({ input: { id: data.id } }),
          );
          await context.client.invalidateQueries(
            api.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  store: {
    create: (
      options?: Parameters<typeof api.store.create.mutationOptions>[0],
    ) =>
      api.store.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.store.getAll.queryOptions(),
          );
          await context.client.refetchQueries(
            api.account.getCurrentUser.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    configure: (
      options?: Parameters<typeof api.store.configure.mutationOptions>[0],
    ) =>
      api.store.configure.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.store.getAll.queryOptions(),
          );
          await context.client.refetchQueries(
            api.account.getCurrentUser.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  telegram: {
    disconnect: (
      options?: Parameters<typeof api.telegram.disconnect.mutationOptions>[0],
    ) =>
      api.telegram.disconnect.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            api.telegram.getStatus.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  onboarding: {
    complete: (
      options?: Parameters<typeof api.onboarding.complete.mutationOptions>[0],
    ) => api.onboarding.complete.mutationOptions({ ...options }),
  },
};
