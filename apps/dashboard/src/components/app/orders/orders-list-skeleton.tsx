"use client";

import { Skeleton } from "@dukkani/ui/components/skeleton";

export function OrdersListSkeleton() {
	return (
		<div className="space-y-3">
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={i}
					className="flex flex-col gap-3 rounded-xl border bg-card p-3"
				>
					<div className="flex items-start justify-between gap-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-5 w-20 rounded-full" />
					</div>
					<Skeleton className="h-3 w-48" />
					<Skeleton className="h-3 w-36" />
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-3 w-40" />
					<div className="flex justify-end pt-1">
						<Skeleton className="h-8 w-16 rounded-md" />
					</div>
				</div>
			))}
		</div>
	);
}
