"use client";

import { StoreBadge } from "@dukkani/ui/components/store-badge";
import { useTranslations } from "next-intl";
import { StoreLink } from "@/components/shared/store-link";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { getStoreUrl } from "@/lib/store-url";
import { useActiveStoreStore } from "@/stores/active-store.store";

export function StoreHeader() {
	const t = useTranslations("dashboard.overview.storeHeader");
	const { selectedStoreId } = useActiveStoreStore();
	const { data: stores } = useStoresQuery();

	const activeStore = stores?.find((s) => s.id === selectedStoreId);

	if (!activeStore) {
		return null;
	}

	const storeUrl = getStoreUrl(activeStore);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl md:text-3xl">{activeStore.name}</h1>
				<StoreBadge status={activeStore.status} />
			</div>
			<StoreLink
				url={storeUrl}
				label={t("yourStoreLink")}
				hint={t("tapToCopy")}
			/>
		</div>
	);
}
