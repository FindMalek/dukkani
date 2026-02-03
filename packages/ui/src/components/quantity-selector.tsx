"use client";

import type * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Icons } from "./icons";

interface QuantitySelectorProps {
	quantity: number;
	onDecrease: () => void;
	onIncrease: () => void;
	min?: number;
	max?: number;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses = {
	sm: {
		button: "size-7",
		icon: "size-3.5",
		text: "text-sm",
	},
	md: {
		button: "size-8",
		icon: "size-4",
		text: "text-base",
	},
	lg: {
		button: "size-9",
		icon: "size-4",
		text: "text-base",
	},
};

export function QuantitySelector({
	quantity,
	onDecrease,
	onIncrease,
	min = 1,
	max = 99,
	disabled = false,
	size = "md",
	className,
	...props
}: QuantitySelectorProps & React.HTMLAttributes<HTMLDivElement>) {
	const sizeClass = sizeClasses[size];
	const isDecreaseDisabled = quantity <= min || disabled;
	const isIncreaseDisabled = quantity >= max || disabled;

	return (
		<div
			data-slot="quantity-selector"
			className={cn(
				"flex items-center gap-2 rounded-lg border border-border bg-muted/50",
				className,
			)}
			{...props}
		>
			<Button
				variant="ghost"
				size="icon"
				className={sizeClass.button}
				onClick={onDecrease}
				disabled={isDecreaseDisabled}
			>
				<Icons.minus className={sizeClass.icon} />
			</Button>
			<span className={cn("min-w-6 text-center font-medium", sizeClass.text)}>
				{quantity}
			</span>
			<Button
				variant="ghost"
				size="icon"
				className={sizeClass.button}
				onClick={onIncrease}
				disabled={isIncreaseDisabled}
			>
				<Icons.plus className={sizeClass.icon} />
			</Button>
		</div>
	);
}
