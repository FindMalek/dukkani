"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export default function DashboardPage() {
	const privateData = useQuery(orpc.dashboard.getStats.queryOptions());

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold md:text-3xl">Dashboard Overview</h1>
				<p className="text-muted-foreground mt-2 text-sm md:text-base">
					Welcome to your dashboard
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>API Status</CardTitle>
						<CardDescription>Connection status</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-2">
							<div
								className={`h-2 w-2 rounded-full ${privateData.data ? "bg-green-500" : "bg-red-500"}`}
							/>
							<span className="text-muted-foreground text-sm">
								{privateData.isLoading
									? "Checking..."
									: privateData.data
										? "Connected"
										: "Disconnected"}
							</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Stats</CardTitle>
						<CardDescription>Overview metrics</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground text-sm">Coming soon</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Latest updates</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground text-sm">Coming soon</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
