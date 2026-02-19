"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Iphone15Pro } from "./iphone-15";
import { PhoneNotifications } from "./phone-notifications";

const FLOATING_BADGES = [
	{
		id: "orders",
		label: "3 orders confirmed",
		icon: "✓",
		className:
			"top-[18%] -right-2 sm:-right-14 bg-primary text-primary-foreground",
		delay: 1.2,
		floatOffset: -8,
	},
	{
		id: "cod",
		label: "COD verified",
		icon: "🔒",
		className:
			"top-[40%] -left-2 sm:-left-20 bg-background border border-border text-foreground",
		delay: 1.8,
		floatOffset: -5,
	},
	{
		id: "delivery",
		label: "Delivery ready",
		icon: "📦",
		className:
			"bottom-[20%] -right-2 sm:-right-14 bg-background border border-border text-foreground",
		delay: 2.4,
		floatOffset: -6,
	},
];

export function PhoneMockup() {
	const containerRef = useRef<HTMLDivElement>(null);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Mouse-tracking: only X tilt (no Y rotation)
	const deltaY = useTransform(mouseX, [-1, 1], [0, 0]);
	const deltaX = useTransform(mouseY, [-1, 1], [-2, 2]);

	const rotateY = useSpring(deltaY, { stiffness: 120, damping: 20 });
	const rotateX = useSpring(deltaX, { stiffness: 120, damping: 20 });

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const rect = containerRef.current?.getBoundingClientRect();
		if (!rect) return;
		const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
		const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
		mouseX.set(x);
		mouseY.set(y);
	}

	function handleMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}

	return (
		// Outer wrapper with horizontal padding so floating badges are never clipped
		<div className="relative mx-auto w-full max-w-[420px] px-16">
			<motion.div
				ref={containerRef}
				className="relative"
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{ perspective: "1200px" }}
			>
				{/* Green glow blob behind phone */}
				<div className="pointer-events-none absolute top-[10%] left-1/2 -z-10 h-[80%] w-[70%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

				{/* Phone with 3D tilt */}
				<motion.div
					style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
					initial={{ rotateY: 0, rotateX: 4, opacity: 0, y: 30 }}
					animate={{ rotateY: 0, rotateX: 2, opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
					className="relative"
				>
					<Iphone15Pro
						width={433}
						height={882}
						className="w-full drop-shadow-2xl"
					>
						<PhoneNotifications />
					</Iphone15Pro>
				</motion.div>

				{/* Floating badges — positioned relative to the motion.div container */}
				{FLOATING_BADGES.map((badge) => (
					<motion.div
						key={badge.id}
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{
							opacity: 1,
							scale: 1,
							y: [0, badge.floatOffset, 0],
						}}
						transition={{
							opacity: { duration: 0.4, delay: badge.delay },
							scale: { duration: 0.4, delay: badge.delay },
							y: {
								duration: 3.5,
								delay: badge.delay + 0.4,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							},
						}}
						className={`absolute flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-medium text-xs shadow-lg ${badge.className}`}
					>
						<span>{badge.icon}</span>
						<span>{badge.label}</span>
					</motion.div>
				))}

				{/* Ground shadow */}
				<div className="mx-auto mt-3 h-3 w-1/2 rounded-full bg-black/20 blur-xl" />
			</motion.div>
		</div>
	);
}
