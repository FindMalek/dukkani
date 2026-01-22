"use client";

import { MetricCard } from "./metric-card";

interface RevenueCardProps {
	title: string;
	value: number;
	currency: string;
	className?: string;
}

export function RevenueCard({
	title,
	value,
	currency,
	className,
}: RevenueCardProps) {
	const formattedNumber = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);

	return (
		<MetricCard
			title={title}
			className={className}
			value={
				<div className="font-bold text-3xl text-foreground">
					{formattedNumber}
					<span className="ml-1.5 font-normal text-foreground/80 text-sm">
						{currency}
					</span>
				</div>
			}
		/>
	);
}
