"use client";

import { Skeleton } from "@dukkani/ui/components/skeleton";

function CustomerListCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-28" />
        <div className="flex items-end justify-between gap-4 border-t pt-3">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}

export function CustomersListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <CustomerListCardSkeleton key={i} />
      ))}
    </div>
  );
}
