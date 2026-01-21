"use client";

import { Card, CardContent } from "@dukkani/ui/components/card";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { QuickActions } from "@/components/app/overview/quick-actions";
import { StoreHeader } from "@/components/app/overview/store-header";
import { ThisWeekCard } from "@/components/app/overview/this-week-card";
import { TodaysPerformance } from "@/components/app/overview/todays-performance";
import { useDashboardStats } from "@/hooks/api/use-dashboard-stats.hook";

export default function DashboardPage() {
	const { data: stats, isLoading, error } = useDashboardStats();

	if (error) {
		return (
			<div className="min-h-screen bg-background p-4">
				<div className="mx-auto max-w-md space-y-6">
					<Card>
						<CardContent className="pt-6">
							<p className="text-destructive text-sm">
								Error loading dashboard stats. Please try again later.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto max-w-md space-y-6 p-4">
				{/* Store Identity Section */}
				<StoreHeader />

				{isLoading ? (
					<div className="space-y-6">
						{/* Today's Performance Skeleton */}
						<div className="space-y-4">
							<Skeleton className="h-4 w-40" />
							<div className="grid grid-cols-2 gap-4">
								<Skeleton className="h-24 rounded-lg" />
								<Skeleton className="h-24 rounded-lg" />
							</div>
						</div>

						{/* This Week Skeleton */}
						<Skeleton className="h-32 rounded-lg" />

						{/* Quick Actions Skeleton */}
						<div className="space-y-4">
							<Skeleton className="h-4 w-32" />
							<div className="space-y-3">
								<Skeleton className="h-16 rounded-lg" />
								<Skeleton className="h-16 rounded-lg" />
							</div>
						</div>
					</div>
				) : stats ? (
					<>
						{/* Today's Performance */}
						<TodaysPerformance stats={stats} />

						{/* This Week */}
						<ThisWeekCard stats={stats} />

						{/* Quick Actions */}
						<QuickActions />
					</>
				) : null}
			</div>
		</div>
	);
}
