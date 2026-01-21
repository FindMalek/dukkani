import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";
import { Icons } from "./icons";

const quickActionButtonVariants = cva(
	"flex w-full items-center justify-between rounded-lg p-4 transition-all",
	{
		variants: {
			variant: {
				primary:
					"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				outline:
					"border border-border bg-background hover:bg-accent hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

interface QuickActionButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof quickActionButtonVariants> {
	asChild?: boolean;
	icon?: React.ComponentType<{ className?: string }>;
	iconBg?: "default" | "muted";
}

export function QuickActionButton({
	className,
	variant,
	asChild = false,
	icon: Icon,
	iconBg = "default",
	children,
	...props
}: QuickActionButtonProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(quickActionButtonVariants({ variant }), className)}
			{...props}
		>
			<div className="flex items-center gap-3">
				{Icon && (
					<div
						className={cn(
							"flex items-center justify-center rounded-full p-2",
							variant === "primary"
								? "bg-white/20"
								: iconBg === "muted"
									? "bg-muted"
									: "bg-muted/50",
						)}
					>
						<Icon className="size-5" />
					</div>
				)}
				<span className="font-medium">{children}</span>
			</div>
			<Icons.chevronRight
				className={cn(
					"size-5",
					variant === "primary"
						? "text-primary-foreground"
						: "text-muted-foreground",
				)}
			/>
		</Comp>
	);
}
