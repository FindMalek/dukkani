import { StoreStatus } from "@dukkani/common/schemas/enums";
import { logger } from "@dukkani/logger";
import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { SearchParams } from "nuqs/server";
import { ComingSoon } from "@/components/app/coming-soon";
import { HeroBanner } from "@/components/app/hero-banner";
import { ProductGrid } from "@/components/app/product-grid";
import { ProductSectionHeader } from "@/components/app/product-section-header";
import { getStoreSlug } from "@/lib/get-store-slug";
import { client, getQueryClient, orpc } from "@/lib/orpc";
import { loadProductsFiltersSearchParams } from "@/lib/products-filtering";

interface StorePageProps {
  searchParams: Promise<SearchParams>;
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const headersList = await headers();
  const host = headersList.get("host");
  const cookieStore = await cookies();
  const storeSlug = getStoreSlug(host, cookieStore);
  const t = await getTranslations("storefront.store");

  if (!storeSlug) {
    return notFound();
  }

  const queryClient = getQueryClient();

  try {
    const store = await queryClient.fetchQuery(
      orpc.store.getBySlugPublic.queryOptions({
        input: { slug: storeSlug },
      }),
    );

    if (!store || !store.name) {
      logger.error({ store }, "Invalid store data");
      return notFound();
    }

    if (store.status === StoreStatus.DRAFT) {
      return <ComingSoon store={store} />;
    }

    const categories = await client.category.getAllPublic({
      storeId: store.id,
    });

    const categoryOptions = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
    }));
    const filters =
      await loadProductsFiltersSearchParams(categoryOptions)(searchParams);

    const productsResponse = await client.product.getAllPublic({
      storeId: store.id,
      priceMin:
        filters["filters[price]"].min === ""
          ? undefined
          : Number(filters["filters[price]"].min),
      priceMax:
        filters["filters[price]"].max === ""
          ? undefined
          : Number(filters["filters[price]"].max),
      categoryId:
        filters["filters[category]"] === "all"
          ? undefined
          : categories.find((cat) => cat.name === filters["filters[category]"])
              ?.id,
      stockFilter: filters["filters[inStockOnly]"] ? "in-stock" : undefined,
      sortBy: filters["filters[sort]"],
    });

    const products = productsResponse.products;

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="min-h-screen overflow-x-hidden bg-background">
          <HeroBanner
            title="New Spring Collection"
            subtitle="Shop the look →"
            linkHref="#"
          />
          <ProductSectionHeader
            title={t("products.title")}
            storeCurrency={store.currency}
            categories={categoryOptions}
          />
          <ProductGrid products={products} store={store} />
        </div>
      </HydrationBoundary>
    );
  } catch (error) {
    if (error instanceof ORPCError && error.status === 404) {
      return notFound();
    }

    throw error;
  }
}
