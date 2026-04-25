import { orpc } from "./orpc";

export const appMutations = {
  category: {
    create: (
      options?: Parameters<typeof orpc.category.create.mutationOptions>[0],
    ) =>
      orpc.category.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.category.getAll.queryOptions({
              input: { storeId: data.storeId },
            }),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    update: (
      options?: Parameters<typeof orpc.category.update.mutationOptions>[0],
    ) =>
      orpc.category.update.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.category.getAll.queryOptions({
              input: { storeId: data.storeId },
            }),
          );
          await context.client.invalidateQueries(
            orpc.category.getById.queryOptions({ input: { id: data.id } }),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    delete: (
      options?: Parameters<typeof orpc.category.delete.mutationOptions>[0],
    ) =>
      orpc.category.delete.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.category.getAll.queryOptions({
              input: { storeId: data.storeId },
            }),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  order: {
    create: (
      options?: Parameters<typeof orpc.order.create.mutationOptions>[0],
    ) =>
      orpc.order.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.order.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    updateStatus: (
      options?: Parameters<typeof orpc.order.updateStatus.mutationOptions>[0],
    ) =>
      orpc.order.updateStatus.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.order.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.order.getById.queryOptions({ input: { id: data.id } }),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    delete: (
      options?: Parameters<typeof orpc.order.delete.mutationOptions>[0],
    ) =>
      orpc.order.delete.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.order.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  product: {
    create: (
      options?: Parameters<typeof orpc.product.create.mutationOptions>[0],
    ) =>
      orpc.product.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    update: (
      options?: Parameters<typeof orpc.product.update.mutationOptions>[0],
    ) =>
      orpc.product.update.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.product.getById.queryOptions({ input: { id: data.id } }),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    delete: (
      options?: Parameters<typeof orpc.product.delete.mutationOptions>[0],
    ) =>
      orpc.product.delete.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    togglePublished: (
      options?: Parameters<
        typeof orpc.product.togglePublish.mutationOptions
      >[0],
    ) =>
      orpc.product.togglePublish.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.product.getAll.queryOptions(),
          );
          await context.client.invalidateQueries(
            orpc.product.getById.queryOptions({ input: { id: data.id } }),
          );
          await context.client.invalidateQueries(
            orpc.store.getStats.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  store: {
    create: (
      options?: Parameters<typeof orpc.store.create.mutationOptions>[0],
    ) =>
      orpc.store.create.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.store.getAll.queryOptions(),
          );
          await context.client.refetchQueries(
            orpc.account.getCurrentUser.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
    configure: (
      options?: Parameters<typeof orpc.store.configure.mutationOptions>[0],
    ) =>
      orpc.store.configure.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.store.getAll.queryOptions(),
          );
          await context.client.refetchQueries(
            orpc.account.getCurrentUser.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  telegram: {
    disconnect: (
      options?: Parameters<typeof orpc.telegram.disconnect.mutationOptions>[0],
    ) =>
      orpc.telegram.disconnect.mutationOptions({
        ...options,
        onSuccess: async (data, input, result, context) => {
          await context.client.invalidateQueries(
            orpc.telegram.getStatus.queryOptions(),
          );
          await options?.onSuccess?.(data, input, result, context);
        },
      }),
  },
  onboarding: {
    complete: (
      options?: Parameters<typeof orpc.onboarding.complete.mutationOptions>[0],
    ) => orpc.onboarding.complete.mutationOptions({ ...options }),
  },
};
