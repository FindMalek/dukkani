import { Skeleton } from "@dukkani/ui/components/skeleton";
import { cn } from "@dukkani/ui/lib/utils";

export function CustomerDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-2xl p-3 pb-8 xl:max-w-6xl">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="h-5 w-28" />
        </div>
        <Skeleton className="size-9 rounded-md" />
      </div>

      <div
        className={cn(
          "mt-2 space-y-2",
          "xl:grid xl:grid-cols-3 xl:items-start xl:gap-4 xl:space-y-0",
          "xl:[grid-template-areas:'summary_summary_contact'_'orders_orders_locations'_'orders_orders_notes']",
        )}
      >
        <div className="grid grid-cols-2 gap-2 xl:[grid-area:summary]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-3 shadow-sm">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="mt-1.5 h-5 w-20" />
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm xl:[grid-area:orders]">
          <Skeleton className="mb-2 h-2.5 w-24" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-2 py-2"
            >
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm xl:[grid-area:contact]">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm xl:[grid-area:locations]">
          <Skeleton className="mb-2 h-2.5 w-20" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5">
              <Skeleton className="mt-0.5 size-4 shrink-0" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm xl:[grid-area:notes]">
          <Skeleton className="mb-2 h-2.5 w-14" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}
