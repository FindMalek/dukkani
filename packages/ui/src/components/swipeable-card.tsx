"use client";

import type * as React from "react";
import { useCallback, useRef, useState } from "react";

import { cn } from "../lib/utils";

const SWIPE_THRESHOLD = 60;
const MAX_DRAG = 100;
const DRAG_THRESHOLD = 8;

export interface SwipeAction {
	side: "left" | "right";
	/** Tailwind bg-* class, e.g. "bg-green-500" or "bg-primary" */
	className: string;
	icon: React.ReactNode;
	label: string;
	onTrigger: () => void;
}

export interface SwipeableCardProps {
	/** Actions revealed by swiping. Filter to undefined to disable a side. */
	actions: (SwipeAction | undefined | null)[];
	/** Fires on tap (click without drag). Use for navigation. */
	onTap?: () => void;
	/** Disables swipe and tap (e.g. while mutation is pending) */
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
	/** Accessible label for the card */
	"aria-label"?: string;
}

export function SwipeableCard({
	actions,
	onTap,
	disabled = false,
	children,
	className,
	"aria-label": ariaLabel,
}: SwipeableCardProps) {
	const leftAction = actions.find((a) => a?.side === "left");
	const rightAction = actions.find((a) => a?.side === "right");
	const canSwipeRight = !!rightAction;
	const canSwipeLeft = !!leftAction;

	const [offsetX, setOffsetX] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const startXRef = useRef<number | null>(null);
	const isDraggingRef = useRef(false);

	const snapBack = useCallback(() => {
		setIsAnimating(true);
		setOffsetX(0);
		setTimeout(() => setIsAnimating(false), 300);
	}, []);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (disabled) return;
			startXRef.current = e.clientX;
			isDraggingRef.current = false;
		},
		[disabled],
	);

	const handlePointerMove = useCallback(
		(e: React.PointerEvent) => {
			if (startXRef.current === null || disabled) return;
			const delta = e.clientX - startXRef.current;

			if (Math.abs(delta) > DRAG_THRESHOLD) {
				isDraggingRef.current = true;
			}

			if (!isDraggingRef.current) return;

			if (delta > 0 && !canSwipeRight) return;
			if (delta < 0 && !canSwipeLeft) return;

			const clamped = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, delta));
			setOffsetX(clamped);
		},
		[disabled, canSwipeLeft, canSwipeRight],
	);

	const handlePointerUp = useCallback(() => {
		if (startXRef.current === null) return;
		const delta = offsetX;
		startXRef.current = null;

		if (!isDraggingRef.current) {
			onTap?.();
			return;
		}

		isDraggingRef.current = false;

		if (delta > SWIPE_THRESHOLD && rightAction) {
			snapBack();
			rightAction.onTrigger();
		} else if (delta < -SWIPE_THRESHOLD && leftAction) {
			snapBack();
			leftAction.onTrigger();
		} else {
			snapBack();
		}
	}, [offsetX, leftAction, rightAction, onTap, snapBack]);

	const handlePointerLeave = useCallback(() => {
		if (isDraggingRef.current) {
			isDraggingRef.current = false;
			startXRef.current = null;
			snapBack();
		}
	}, [snapBack]);

	const showRightPanel = offsetX > DRAG_THRESHOLD;
	const showLeftPanel = offsetX < -DRAG_THRESHOLD;
	const rightOpacity = Math.min(1, (offsetX / SWIPE_THRESHOLD) * 1.2);
	const leftOpacity = Math.min(1, (Math.abs(offsetX) / SWIPE_THRESHOLD) * 1.2);

	return (
		<div className={cn("relative overflow-hidden rounded-xl", className)}>
			{/* Action panels — behind the card */}
			<div className="absolute inset-0 flex">
				{rightAction && (
					<div
						className={cn(
							"flex h-full w-full items-center justify-start px-5",
							rightAction.className,
						)}
						style={{ opacity: showRightPanel ? rightOpacity : 0 }}
						aria-hidden="true"
					>
						<div className="flex flex-col items-center gap-1 text-white">
							{rightAction.icon}
							<span className="font-medium text-xs">{rightAction.label}</span>
						</div>
					</div>
				)}
				{leftAction && (
					<div
						className={cn(
							"flex h-full w-full items-center justify-end px-5",
							leftAction.className,
						)}
						style={{ opacity: showLeftPanel ? leftOpacity : 0 }}
						aria-hidden="true"
					>
						<div className="flex flex-col items-center gap-1 text-primary-foreground">
							{leftAction.icon}
							<span className="font-medium text-xs">{leftAction.label}</span>
						</div>
					</div>
				)}
			</div>

			{/* Card — slides over the action panels */}
			<button
				type="button"
				aria-label={ariaLabel}
				className="relative flex w-full cursor-pointer select-none flex-col gap-3 rounded-xl border bg-card p-4 text-start"
				style={{
					transform: `translateX(${offsetX}px)`,
					transition: isAnimating ? "transform 0.25s ease-out" : "none",
					touchAction: "pan-y",
					opacity: disabled ? 0.6 : 1,
				}}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerLeave={handlePointerLeave}
			>
				{children}
			</button>
		</div>
	);
}
