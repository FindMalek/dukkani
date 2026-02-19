"use client";

import { motion } from "framer-motion";
import { Iphone15Pro } from "./iphone-15";
import { PhoneNotifications } from "./phone-notifications";

const FLOATING_BADGES = [
	{
		id: "orders",
		label: "3 orders confirmed",
		icon: "✓",
		className:
			"top-[12%] -right-2 sm:-right-14 bg-primary text-primary-foreground",
		delay: 1.2,
		floatOffset: -8,
	},
	{
		id: "cod",
		label: "COD verified",
		icon: "🔒",
		className:
			"top-[38%] -left-2 sm:-left-20 bg-background border border-border text-foreground",
		delay: 1.8,
		floatOffset: -5,
	},
	{
		id: "delivery",
		label: "Delivery ready",
		icon: "📦",
		className:
			"bottom-[5%] -right-2 sm:-right-14 bg-background border border-border text-foreground",
		delay: 2.4,
		floatOffset: -6,
	},
];

export function PhoneMockup() {
	return (
		<div className="relative mx-auto w-full max-w-[420px] px-16">
			<div className="relative">
				{/* Green glow blob behind phone */}
				<div className="pointer-events-none absolute top-[10%] left-1/2 -z-10 h-[80%] w-[70%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

				{/* Phone entry animation */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
					className="relative"
				>
					<Iphone15Pro
						width={433}
						height={882}
						cropHeight={550}
						className="w-full drop-shadow-2xl"
					>
						<PhoneNotifications />
					</Iphone15Pro>
				</motion.div>

				{/* Floating badges */}
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
			</div>
		</div>
	);
}
