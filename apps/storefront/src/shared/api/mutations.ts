import { handleAPIError } from "./error-handler";
import { orpc } from "./orpc";

export const appMutations = {
  order: {
    create: (
      options?: Parameters<typeof orpc.order.createPublic.mutationOptions>[0],
    ) =>
      orpc.order.createPublic.mutationOptions({
        ...options,
        onError: (error) => handleAPIError(error),
      }),
  },
};
