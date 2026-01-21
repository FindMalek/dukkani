import { cn } from "../lib/utils";
import { Badge } from "./badge";

interface LiveStoreBadgeProps {
	className?: string;
}

export function LiveStoreBadge({ className }: LiveStoreBadgeProps) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
				className,
			)}
		>
			Live store
		</Badge>
	);
}
