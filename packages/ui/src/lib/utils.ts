import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * RTL (Right-to-Left) utilities for directional icons.
 * Use for: arrowRight, arrowLeft, chevronLeft, chevronRight, etc.
 *
 * Apply rtl:rotate-180 so icons flip correctly in RTL layouts.
 */

export const RTL_ICON_CLASS = "rtl:rotate-180" as const;

/**
 * Use in cn() for directional icons:
 *
 * @example
 * <Icons.arrowRight className={cn("size-4", RTL_ICON_CLASS)} />
 */
export function rtlIconClass(className?: string): string {
	return className ? `rtl:rotate-180 ${className}`.trim() : RTL_ICON_CLASS;
}
