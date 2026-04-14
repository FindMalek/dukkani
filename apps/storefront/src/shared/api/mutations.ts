import { handleAPIError } from "./error-handler";
import { orpc } from "./orpc";

export const appMutations = {
  order: {
    create: (
      options?: Parameters<typeof orpc.order.createPublic.mutationOptions>[0],
    ) =>
      orpc.order.createPublic.mutationOptions({
        ...options,
        onError: (...args) => {
          handleAPIError(args[0]);
          (options?.onError as ((...a: typeof args) => void) | undefined)?.(
            ...args,
          );
        },
      }),
  },
  store: {
    subscribeToLaunch: (
      options?: Parameters<
        typeof orpc.store.subscribeToLaunch.mutationOptions
      >[0],
    ) =>
      orpc.store.subscribeToLaunch.mutationOptions({
        ...options,
        onError: (...args) => {
          handleAPIError(args[0]);
          (options?.onError as ((...a: typeof args) => void) | undefined)?.(
            ...args,
          );
        },
      }),
  },
};
