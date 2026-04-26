import { Skeleton } from "@dukkani/ui/components/skeleton";

export function OrderDetailSkeleton() {
  return (
    <>
      <div className="container mx-auto max-w-2xl space-y-2 p-3 pb-24">
        <div className="flex items-center justify-between">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="h-5 w-28" />
          <div className="w-9" />
        </div>

        <div className="flex flex-col items-center gap-0.5 pt-0">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="mt-1 h-3 w-48" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2.5 rounded-xl border bg-card p-3 shadow-sm">
            <Skeleton className="size-4 shrink-0" />
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border bg-card p-3 shadow-sm">
            <Skeleton className="size-4 shrink-0" />
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-10" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm">
          <Skeleton className="mb-1.5 h-2.5 w-16" />
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="size-8 shrink-0 rounded-md" />
          </div>
        </div>

        <div className="space-y-1.5 rounded-xl border bg-card p-3 shadow-sm">
          <Skeleton className="h-2.5 w-28" />
          <div className="flex gap-2">
            <Skeleton className="mt-0.5 size-4 shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm">
          <Skeleton className="mb-1.5 h-2.5 w-20" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 py-2 first:pt-0">
              <Skeleton className="size-10 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
          <div className="mt-2 space-y-1.5 border-border border-t border-dashed pt-2">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <Skeleton className="size-9 shrink-0 rounded-md" />
          <Skeleton className="h-12 min-w-0 flex-1 rounded-full" />
        </div>
      </div>
    </>
  );
}
