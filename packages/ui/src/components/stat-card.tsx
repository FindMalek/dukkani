// packages/ui/src/components/stat-card.tsx

import { cn } from "../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Icons } from "./icons";

interface StatCardProps {
	title: string;
	value: string | number;
	description?: string;
	change?: number;
	changeLabel?: string;
	className?: string;
	currency?: string; // Currency code (e.g., "TND", "USD")
}

export function StatCard({
	title,
	value,
	description,
	change,
	changeLabel,
	className,
	currency,
}: StatCardProps) {
	const hasPositiveChange = change !== undefined && change > 0;
	const hasNegativeChange = change !== undefined && change < 0;
	const hasChange = change !== undefined && change !== 0;

	// Format value for display
	const displayValue = (() => {
		if (currency && typeof value === "number") {
			// Format number with currency: show number and currency separately
			const formattedNumber = new Intl.NumberFormat("en-US", {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(value);
			return { number: formattedNumber, currency };
		}
		return { number: String(value), currency: null };
	})();

	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-muted-foreground text-sm">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="font-bold text-3xl text-foreground">
					{displayValue.number}
					{displayValue.currency && (
						<span className="ml-2 font-normal text-foreground/80 text-sm">
							{displayValue.currency}
						</span>
					)}
				</div>
				{description && (
					<p className="mt-1 text-muted-foreground text-xs">{description}</p>
				)}
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
							{changeLabel && ` ${changeLabel}`}
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
