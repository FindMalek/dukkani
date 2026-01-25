import { StoreStatus } from "@dukkani/common/schemas/enums";
import { logger } from "@dukkani/logger";
import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CategoryFilter } from "@/components/app/category-filter";
import { ComingSoon } from "@/components/app/coming-soon";
import { HeroBanner } from "@/components/app/hero-banner";
import { ProductGrid } from "@/components/app/product-grid";
import { ProductSectionHeader } from "@/components/app/product-section-header";
import { client, getQueryClient, orpc } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

export default async function StorePage() {
	const headersList = await headers();
	const host = headersList.get("host");
	const storeSlug = getStoreSlugFromHost(host);
	const t = await getTranslations("storefront.store");

	if (!storeSlug) {
		return notFound();
	}

	const queryClient = getQueryClient();

	try {
		await queryClient.prefetchQuery({
			...orpc.store.getBySlugPublic.queryOptions({
				input: { slug: storeSlug },
			}),
			staleTime: 2 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
		});

		const store = await queryClient.fetchQuery(
			orpc.store.getBySlugPublic.queryOptions({ input: { slug: storeSlug } }),
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

		const products = store.products || [];

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<div className="min-h-screen overflow-x-hidden bg-background">
					<HeroBanner
						title="New Spring Collection"
						subtitle="Shop the look →"
						linkHref="#"
					/>
					{categoryOptions.length > 0 && (
						<CategoryFilter categories={categoryOptions} />
					)}
					<ProductSectionHeader title={t("products.title")} />
					<ProductGrid products={products} />
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
