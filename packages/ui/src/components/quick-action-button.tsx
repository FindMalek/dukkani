import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
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
	extends Omit<
			React.ComponentProps<typeof Button>,
			"variant" | "size" | "children"
		>,
		VariantProps<typeof quickActionButtonVariants> {
	icon?: React.ComponentType<{ className?: string }>;
	iconBg?: "default" | "muted";
	children: React.ReactNode;
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
	const textContent = React.useMemo(() => {
		if (asChild && React.isValidElement(children)) {
			const childElement = children as React.ReactElement<{
				children?: React.ReactNode;
			}>;
			const linkChildren = childElement.props.children;
			if (typeof linkChildren === "string") {
				return linkChildren;
			}
			if (React.isValidElement(linkChildren)) {
				const nestedElement = linkChildren as React.ReactElement<{
					children?: React.ReactNode;
				}>;
				return nestedElement.props.children || linkChildren;
			}
			return linkChildren;
		}
		return children;
	}, [asChild, children]);

	const content = (
		<>
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
				<span className="font-medium">{textContent}</span>
			</div>
			<Icons.chevronRight
				className={cn(
					"size-5",
					variant === "primary"
						? "text-primary-foreground"
						: "text-muted-foreground",
				)}
			/>
		</>
	);

	if (asChild) {
		// When asChild is true, clone the child (Link) and replace its children with our content
		const child = React.Children.only(children) as React.ReactElement<
			React.HTMLAttributes<HTMLElement> & { className?: string }
		>;

		return (
			<Button
				asChild
				className={cn(quickActionButtonVariants({ variant }), className)}
				{...props}
			>
				{React.cloneElement(child, {
					...child.props,
					className: cn(
						quickActionButtonVariants({ variant }),
						className,
						child.props.className,
					),
					children: content,
				} as React.HTMLAttributes<HTMLElement>)}
			</Button>
		);
	}

	return (
		<Button
			className={cn(quickActionButtonVariants({ variant }), className)}
			{...props}
		>
			{content}
		</Button>
	);
}
