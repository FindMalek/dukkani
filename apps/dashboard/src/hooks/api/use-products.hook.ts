import type {
  CreateProductInput,
  ListProductsInput,
  TogglePublishProductInput,
  UpdateProductInput,
} from "@dukkani/common/schemas/product/input";
import type { QueryClient } from "@tanstack/react-query";
import {
  mutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client, orpc } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";

/**
 * Refetch every `product.getAll` query (active and inactive) so list thumbnails stay in sync
 * after edits while the products page is not mounted (e.g. product detail route).
 */
export async function invalidateProductListQueries(queryClient: QueryClient) {
  await queryClient.invalidateQueries({
    queryKey: queryKeys.products.all(),
    refetchType: "all",
  });
}

/**
 * Query hook for fetching products list
 */
export function useProductsQuery(input: ListProductsInput) {
  return useQuery(orpc.product.getAll.queryOptions({ input }));
}

/**
 * Query hook for fetching a single product by ID
 */
export function useProductQuery(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    ...orpc.product.getById.queryOptions({
      input: { id },
    }),
    enabled: options?.enabled ?? (Boolean(id) && id.length > 0),
  });
}

/**
 * Mutation hook for creating a product
 */
export const createProductMutationOptions = mutationOptions({
  mutationFn: (input: CreateProductInput) => client.product.create(input),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    await invalidateProductListQueries(context.client);
    await context.client.invalidateQueries({
      queryKey: queryKeys.dashboard.stats(),
    });
  },
});

/**
 * Mutation hook for updating a product
 */
export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProductInput) => client.product.update(input),
    onSuccess: async (data) => {
      await invalidateProductListQueries(queryClient);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.products.byId(data.id),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(),
      });
    },
  });
}

/**
 * Mutation hook for deleting a product
 */
export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => client.product.delete({ id }),
    onSuccess: async () => {
      await invalidateProductListQueries(queryClient);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(),
      });
    },
  });
}

/**
 * Mutation hook for toggling product publish status
 */
export function useTogglePublishProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TogglePublishProductInput) =>
      client.product.togglePublish(input),
    onSuccess: async (data) => {
      await invalidateProductListQueries(queryClient);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.products.byId(data.id),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(),
      });
    },
  });
}
