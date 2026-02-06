import { Skeleton } from "@dukkani/ui/components/skeleton";

export default function CheckoutLoading() {
	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-2">
				{/* Form skeleton */}
				<div className="space-y-6">
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-10 w-full" />
							</div>
						))}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-10 w-full" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
					</div>
					<div className="space-y-3">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-14 w-full rounded-md" />
						<Skeleton className="h-14 w-full rounded-md" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-36" />
						<Skeleton className="h-20 w-full" />
					</div>
				</div>
				{/* Summary skeleton */}
				<div className="space-y-4">
					<Skeleton className="h-6 w-40" />
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="flex items-start justify-between">
							<div className="space-y-1">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>
							<Skeleton className="h-4 w-16" />
						</div>
					))}
					<Skeleton className="h-px w-full" />
					<div className="space-y-2">
						<div className="flex justify-between">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-20" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-20" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-6 w-16" />
							<Skeleton className="h-6 w-24" />
						</div>
					</div>
				</div>
			</div>
			<Skeleton className="mt-8 h-12 w-full rounded-md" />
		</div>
	);
}
