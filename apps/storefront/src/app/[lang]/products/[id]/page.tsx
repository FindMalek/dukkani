import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { ProductDetailInteractive } from "@/components/app/product-detail-interactive";
import { getQueryClient, orpc } from "@/shared/api/orpc";
import { getStoreSlug } from "@/shared/lib/store/slug-retrieval.util";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  const headersList = await headers();
  const host = headersList.get("host");
  const cookieStore = await cookies();
  const storeSlug = getStoreSlug(host, cookieStore);

  if (!storeSlug) {
    return notFound();
  }

  try {
    await queryClient.prefetchQuery(
      orpc.product.getByIdPublic.queryOptions({
        input: { id },
      }),
    );

    const product = queryClient.getQueryData(
      orpc.product.getByIdPublic.queryKey({ input: { id } }),
    );

    const store = await queryClient.ensureQueryData(
      orpc.store.getBySlugPublic.queryOptions({
        input: { slug: storeSlug },
      }),
    );

    if (!product || !store) {
      return notFound();
    }

    // Determine if store is open (simplified - will be enhanced when opening hours are implemented)
    const isStoreOpen = true;

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailInteractive
          product={product}
          store={store}
          isStoreOpen={isStoreOpen}
        />
      </HydrationBoundary>
    );
  } catch (error) {
    if (error instanceof ORPCError && error.status === 404) {
      return notFound();
    }

    // Log unexpected errors
    console.error("Product detail page error:", error);
    return notFound();
  }
}
