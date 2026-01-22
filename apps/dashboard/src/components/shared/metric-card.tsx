"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { cn } from "@dukkani/ui/lib/utils";

interface MetricCardProps {
	title: string;
	value: React.ReactNode;
	className?: string;
}

export function MetricCard({ title, value, className }: MetricCardProps) {
	return (
		<Card className={cn("flex flex-col", className)}>
			<CardHeader className="-mb-2 shrink-0 pb-2">
				<CardTitle className="font-medium text-muted-foreground text-sm">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-1 items-end">{value}</CardContent>
		</Card>
	);
}
