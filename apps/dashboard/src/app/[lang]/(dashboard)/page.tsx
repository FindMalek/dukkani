"use client";

import { Card, CardContent } from "@dukkani/ui/components/card";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { QuickActions } from "@/components/app/overview/quick-actions";
import { StoreHeader } from "@/components/app/overview/store-header";
import { ThisWeekCard } from "@/components/app/overview/this-week-card";
import { TodaysPerformance } from "@/components/app/overview/todays-performance";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";

export default function DashboardPage() {
  const { selectedStoreId } = useActiveStoreStore();
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    ...appQueries.store.stats({
      input: { storeId: selectedStoreId ?? undefined },
    }),
    enabled: !!selectedStoreId,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">
                Error loading dashboard stats. Please try again later.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md space-y-6 p-4 md:max-w-3xl md:p-6 xl:max-w-6xl">
        {/* Store Identity Section */}
        <StoreHeader />

        {isLoading ? (
          <div className="space-y-6">
            {/* Stats Skeleton: Today's Performance + This Week reflow into one row at desktop */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr] xl:items-start">
              {/* Today's Performance Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-40" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                </div>
              </div>

              {/* This Week Skeleton */}
              <Skeleton className="h-32 rounded-lg" />
            </div>

            {/* Quick Actions Skeleton: mobile/tablet only, see QuickActions itself */}
            <div className="space-y-4 xl:hidden">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Skeleton className="h-16 rounded-lg" />
                <Skeleton className="h-16 rounded-lg" />
              </div>
            </div>
          </div>
        ) : stats ? (
          <>
            {/* Stats: Today's Performance + This Week reflow into one row at desktop */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr] xl:items-start">
              <TodaysPerformance stats={stats} />
              <ThisWeekCard stats={stats} />
            </div>

            {/* Quick Actions: mobile/tablet only — redundant with sidebar nav + "+ Create" on desktop */}
            <div className="xl:hidden">
              <QuickActions />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
