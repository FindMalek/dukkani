import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";

import { Skeleton } from "@dukkani/ui/components/skeleton";

export default function ProductDetailPageLoading() {
	return (
		<div className="min-h-screen bg-background pb-20">
			<div className="h-[49px]" />
			<div className="container mx-auto px-4 py-4">
				<AspectRatio ratio={1}>
					<Skeleton className="h-full w-full" />
				</AspectRatio>
				<div className="mt-4 space-y-4">
					<div className="flex items-baseline justify-between gap-4">
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-8 w-20" />
					</div>
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-16 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>
			</div>
		</div>
	);
}
