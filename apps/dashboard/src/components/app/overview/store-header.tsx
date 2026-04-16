"use client";

import { Skeleton } from "@dukkani/ui/components/skeleton";
import { StoreBadge } from "@dukkani/ui/components/store-badge";
import { useQuery } from "@tanstack/react-query";
import { useT } from "next-i18next/client";
import { StoreLink } from "@/components/shared/store-link";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";
import { getStoreUrl } from "@/shared/lib/store/url.util";

export function StoreHeader() {
  const { selectedStoreId } = useActiveStoreStore();
  const { data: stores, isLoading } = useQuery(appQueries.store.all());
  const { t } = useT("pages", { keyPrefix: "dashboard.overview.storeHeader" });

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
