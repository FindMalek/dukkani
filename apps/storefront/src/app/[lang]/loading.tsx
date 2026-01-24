import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import { Skeleton } from "@dukkani/ui/components/skeleton";

export default function StorePageLoading() {
	return (
		<div className="min-h-screen overflow-x-hidden bg-background">
			{/* Hero Banner Skeleton */}
			<div className="container mx-auto mb-6 px-4">
				<div className="relative overflow-hidden rounded-lg">
					<AspectRatio ratio={16 / 8}>
						<Skeleton className="h-full w-full" />
					</AspectRatio>
				</div>
			</div>

			{/* Category Filter Skeleton */}
			<div className="mb-2 w-full overflow-x-hidden px-4">
				<div className="flex gap-2 pb-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-9 w-20 rounded-full" />
					))}
				</div>
			</div>

			{/* Product Section Header Skeleton */}
			<div className="container mx-auto mb-4 px-4">
				<Skeleton className="h-7 w-32" />
			</div>

			{/* Product Grid Skeleton */}
			<div className="container mx-auto px-4 pb-8">
				<div className="grid grid-cols-2 gap-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="space-y-2">
							<AspectRatio ratio={3 / 4}>
								<Skeleton className="h-full w-full rounded-lg" />
							</AspectRatio>
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
