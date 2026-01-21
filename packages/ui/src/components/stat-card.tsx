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
}

export function StatCard({
	title,
	value,
	description,
	change,
	changeLabel,
	className,
}: StatCardProps) {
	const hasPositiveChange = change !== undefined && change > 0;
	const hasNegativeChange = change !== undefined && change < 0;
	const hasChange = change !== undefined && change !== 0;

	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-muted-foreground text-sm">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl">{value}</div>
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
						{hasPositiveChange && <Icons.chevronUp className="size-3" />}
						{hasNegativeChange && <Icons.chevronDown className="size-3" />}
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
