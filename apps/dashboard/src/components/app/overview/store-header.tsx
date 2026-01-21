"use client";

import { LiveStoreBadge } from "@dukkani/ui/components/live-store-badge";
import { StoreLink } from "@dukkani/ui/components/store-link";
import { useTranslations } from "next-intl";
import { env } from "@/env";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { useActiveStoreStore } from "@/stores/active-store.store";

export function StoreHeader() {
	const t = useTranslations("dashboard.overview.storeHeader");
	const { selectedStoreId } = useActiveStoreStore();
	const { data: stores } = useStoresQuery();

	const activeStore = stores?.find((s) => s.id === selectedStoreId);

	if (!activeStore) {
		return null;
	}

	// Generate store URL - easy to extend for custom DNS later
	const storeUrl = activeStore.customDomain
		? `https://${activeStore.customDomain}`
		: `https://${activeStore.slug}.${env.NEXT_PUBLIC_STORE_DOMAIN}`;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl md:text-3xl">{activeStore.name}</h1>
				{activeStore.status === "PUBLISHED" && <LiveStoreBadge />}
			</div>
			<StoreLink
				url={storeUrl}
				label={t("yourStoreLink")}
				hint={t("tapToCopy")}
			/>
		</div>
	);
}
