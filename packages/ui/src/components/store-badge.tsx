import type { StoreStatus } from "@dukkani/common/schemas/enums";
import { cn } from "../lib/utils";
import { Badge } from "./badge";

interface StoreBadgeProps {
	status: StoreStatus;
	className?: string;
}

const statusConfig: Record<StoreStatus, { label: string; className: string }> =
	{
		DRAFT: {
			label: "Draft",
			className:
				"border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300",
		},
		PUBLISHED: {
			label: "Live store",
			className:
				"border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
		},
		SUSPENDED: {
			label: "Suspended",
			className:
				"border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
		},
		ARCHIVED: {
			label: "Archived",
			className:
				"border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400",
		},
	};

export function StoreBadge({ status, className }: StoreBadgeProps) {
	const config = statusConfig[status];

	return (
		<Badge variant="outline" className={cn(config.className, className)}>
			{config.label}
		</Badge>
	);
}
