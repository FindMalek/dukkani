import { Skeleton } from "@dukkani/ui/components/skeleton";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function DashboardLoading() {
	return (
		<div className="grid h-svh grid-rows-[auto_1fr]">
			<main className="overflow-auto p-4 md:p-6">
				<div className="container mx-auto max-w-7xl space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-8 w-64" />
						<Skeleton className="h-4 w-96" />
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-32" />
						))}
					</div>
				</div>
			</main>
			<BottomNavigation />
		</div>
	);
}
