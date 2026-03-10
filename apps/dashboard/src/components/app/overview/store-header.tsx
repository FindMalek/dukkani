"use client";

import { Skeleton } from "@dukkani/ui/components/skeleton";
import { StoreBadge } from "@dukkani/ui/components/store-badge";
import { useTranslations } from "next-intl";
import { StoreLink } from "@/components/shared/store-link";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { getStoreUrl } from "@/lib/store-url";
import { useActiveStoreStore } from "@/stores/active-store.store";

export function StoreHeader() {
	const { selectedStoreId } = useActiveStoreStore();
	const { data: stores, isLoading } = useStoresQuery();
	const t = useTranslations("dashboard.overview.storeHeader");

	const activeStore = stores?.find((s) => s.id === selectedStoreId);

	if (isLoading) {
		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-6 w-20 rounded-full" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-12 w-full rounded-lg" />
					<Skeleton className="h-3 w-40" />
				</div>
			</div>
		);
	}

	if (!activeStore) {
		return null;
	}

	const storeUrl = getStoreUrl(activeStore);

	return (
		<div className="space-y-4">
			{/* Store Name + Badge */}
			<div className="flex items-center justify-between gap-3">
				<h1 className="flex-1 font-bold text-foreground text-xl">
					{activeStore.name}
				</h1>
				<StoreBadge status={activeStore.status} />
			</div>

			{/* Store Link */}
			<StoreLink
				url={storeUrl}
				label={t("yourStoreLink")}
				hint={t("tapToCopy")}
			/>
		</div>
	);
}
