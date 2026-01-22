"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import { MetricCard } from "./metric-card";

interface OrdersCardProps {
	title: string;
	value: number;
	change?: number;
	className?: string;
}

export function OrdersCard({
	title,
	value,
	change,
	className,
}: OrdersCardProps) {
	const hasPositiveChange = change !== undefined && change > 0;
	const hasNegativeChange = change !== undefined && change < 0;
	const hasChange = change !== undefined && change !== 0;

	return (
		<MetricCard
			title={title}
			className={className}
			value={
				<div className="w-full">
					<div className="font-bold text-3xl text-foreground">{value}</div>
					{hasChange && (
						<div
							className={cn(
								"mt-1 flex items-center gap-1 text-xs",
								hasPositiveChange && "text-success dark:text-success",
								hasNegativeChange && "text-destructive dark:text-destructive",
							)}
						>
							{hasPositiveChange && <Icons.upRight className="size-3" />}
							{hasNegativeChange && <Icons.downRight className="size-3" />}
							<span>
								{hasPositiveChange ? "+" : ""}
								{change}
							</span>
						</div>
					)}
				</div>
			}
		/>
	);
}
