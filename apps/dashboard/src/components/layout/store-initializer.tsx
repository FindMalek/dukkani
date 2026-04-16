"use client";

import { Card, CardContent } from "@dukkani/ui/components/card";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { useEffect } from "react";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";

function StoreInitializerLoader() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background p-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}

/**
 * Client component that initializes the active store.
 * Should be used in dashboard layouts to ensure store is initialized.
 */
export function StoreInitializer({ children }: { children: React.ReactNode }) {
  const { t } = useT("pages", { keyPrefix: "dashboard.storeInitializer" });
  const { selectedStoreId, setSelectedStoreId, setIsLoading } =
    useActiveStoreStore();
  const {
    data: stores,
    isPending,
    isError,
    error,
  } = useQuery(appQueries.store.all());

  const storesList = stores ?? [];
  const hasValidSelection =
    stores !== undefined &&
    selectedStoreId !== null &&
    storesList.some((s) => s.id === selectedStoreId);

  useEffect(() => {
    if (isError || (stores !== undefined && stores.length === 0)) {
      setIsLoading(false);
      return;
    }
    setIsLoading(isPending || !hasValidSelection);
  }, [hasValidSelection, isError, isPending, setIsLoading, stores]);

  useEffect(() => {
    if (!selectedStoreId && stores && stores.length > 0) {
      setSelectedStoreId(stores[0].id);
      setIsLoading(false);
    }
  }, [selectedStoreId, stores, setSelectedStoreId, setIsLoading]);

  useEffect(() => {
    if (
      stores &&
      stores.length > 0 &&
      selectedStoreId &&
      !stores.some((s) => s.id === selectedStoreId)
    ) {
      setSelectedStoreId(null);
    }
  }, [stores, selectedStoreId, setSelectedStoreId]);

  if (isError) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-destructive text-sm">
              {error instanceof Error ? error.message : t("loadError")}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isPending) {
    return <StoreInitializerLoader />;
  }

  if (storesList.length === 0) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4 pt-6">
            <p className="text-muted-foreground text-sm">{t("noStores")}</p>
            <Link
              className="font-medium text-primary text-sm underline"
              href={RoutePaths.AUTH.ONBOARDING.INDEX.url}
            >
              {t("goToOnboarding")}
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasValidSelection) {
    return <StoreInitializerLoader />;
  }

  return <>{children}</>;
}
