"use client";

import { Skeleton } from "@dukkani/ui/components/skeleton";

export function ProductsListSkeleton() {
	return (
		<div className="space-y-3">
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={i}
					className="flex items-center gap-4 rounded-lg border bg-card p-4"
				>
					<Skeleton className="size-14 shrink-0 rounded-md" />
					<div className="min-w-0 flex-1 space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-3 w-40" />
					</div>
					<div className="flex shrink-0 items-center gap-2">
						<Skeleton className="h-5 w-16 rounded-full" />
						<Skeleton className="size-4 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}
