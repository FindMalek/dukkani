import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { getTranslations } from "next-intl/server";
import { client } from "@/lib/orpc";
import { CategoryFilter } from "./category-filter";
import { HeroBanner } from "./hero-banner";
import { ProductGrid } from "./product-grid";
import { ProductSectionHeader } from "./product-section-header";
import { StoreHeaderClient } from "./store-header-client";

interface StorefrontLayoutProps {
	store: StorePublicOutput;
}

export async function StorefrontLayout({ store }: StorefrontLayoutProps) {
	const t = await getTranslations("storefront.store");

	const categories = await client.category.getAllPublic({
		storeId: store.id,
	});

	const categoryOptions = categories.map((cat) => ({
		id: cat.id,
		name: cat.name,
	}));

	const products = store.products || [];

	return (
		<div className="min-h-screen bg-background">
			<StoreHeaderClient storeName={store.name} />
			{categoryOptions.length > 0 && (
				<CategoryFilter categories={categoryOptions} />
			)}
			<ProductGrid products={products} />
			<HeroBanner
				title="New Spring Collection"
				subtitle="Shop the look →"
				linkHref="#"
			/>
			<ProductSectionHeader title={t("products.title")} />
		</div>
	);
}
