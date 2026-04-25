import { Skeleton } from "@dukkani/ui/components/skeleton";

export function OrderDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-2xl space-y-4 p-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="h-5 w-28" />
        <div className="w-9" />
      </div>

      {/* Status + Price + ID */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Info cards row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
          <Skeleton className="size-5" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
          <Skeleton className="size-5" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Customer card */}
      <div className="space-y-4 rounded-xl border bg-card p-4">
        <Skeleton className="h-5 w-20" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>

      {/* Delivery address card */}
      <div className="space-y-4 rounded-xl border bg-card p-4">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
          <Skeleton className="mt-0.5 size-4 shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>

      {/* Order items card */}
      <div className="space-y-4 rounded-xl border bg-card p-4">
        <Skeleton className="h-5 w-24" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-14 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
        <div className="space-y-2 border-t pt-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
