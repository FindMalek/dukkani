"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const NOTIFICATIONS = [
	{
		id: "cod",
		title: "New COD order",
		subtitle: "#245",
		accentClass: "bg-muted-foreground/30",
		cardClass: "bg-muted/60",
		icon: null,
		iconBg: null,
	},
	{
		id: "confirmed",
		title: "Order confirmed",
		subtitle: "Verified automatically",
		accentClass: "bg-primary",
		cardClass: "bg-primary/10",
		icon: Icons.circleCheck,
		iconBg: "bg-primary/15 text-primary",
	},
	{
		id: "telegram",
		title: "Telegram alert",
		subtitle: "New order ready",
		accentClass: "bg-sky-400",
		cardClass: "bg-muted/60",
		icon: Icons.telegram,
		iconBg: "bg-sky-400/15 text-sky-500",
	},
	{
		id: "delivery",
		title: "Delivery prepared",
		subtitle: "Pickup scheduled",
		accentClass: "bg-amber-400",
		cardClass: "bg-muted/60",
		icon: Icons.package,
		iconBg: "bg-amber-400/15 text-amber-500",
	},
];

const LOOP_DURATION_MS = 6500;

export function PhoneNotifications() {
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setCycle((c) => c + 1);
		}, LOOP_DURATION_MS);
		return () => clearInterval(id);
	}, []);

	return (
		<div
			className="flex h-full flex-col bg-background"
			style={{ transform: "translateZ(0)", WebkitFontSmoothing: "antialiased" }}
		>
			{/* iOS Status Bar */}
			<div className="flex shrink-0 items-center justify-between px-5 pt-2.5 pb-1">
				<span className="font-semibold text-[10px] text-foreground tracking-tight">
					9:41
				</span>
				<div className="flex items-center gap-1">
					{/* Signal bars */}
					<svg
						width="14"
						height="10"
						viewBox="0 0 14 10"
						fill="none"
						aria-hidden="true"
					>
						<rect
							x="0"
							y="6"
							width="2.5"
							height="4"
							rx="0.5"
							className="fill-foreground"
						/>
						<rect
							x="3.5"
							y="4"
							width="2.5"
							height="6"
							rx="0.5"
							className="fill-foreground"
						/>
						<rect
							x="7"
							y="2"
							width="2.5"
							height="8"
							rx="0.5"
							className="fill-foreground"
						/>
						<rect
							x="10.5"
							y="0"
							width="2.5"
							height="10"
							rx="0.5"
							className="fill-foreground/30"
						/>
					</svg>
					{/* WiFi icon */}
					<svg
						width="12"
						height="9"
						viewBox="0 0 12 9"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M6 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
							className="fill-foreground"
						/>
						<path
							d="M3.5 5.5C4.3 4.6 5.1 4 6 4s1.7.6 2.5 1.5"
							stroke="currentColor"
							strokeWidth="1.2"
							strokeLinecap="round"
							className="stroke-foreground"
						/>
						<path
							d="M1 3C2.5 1.4 4.2 0.5 6 0.5S9.5 1.4 11 3"
							stroke="currentColor"
							strokeWidth="1.2"
							strokeLinecap="round"
							className="stroke-foreground"
						/>
					</svg>
					{/* Battery */}
					<div className="relative flex items-center">
						<div className="h-2.5 w-5 rounded-[2px] border border-foreground/60 p-px">
							<div className="h-full w-[80%] rounded-[1px] bg-foreground" />
						</div>
						<div className="ml-px h-1 w-0.5 rounded-r-full bg-foreground/60" />
					</div>
				</div>
			</div>

			{/* Dynamic Island spacer */}
			<div className="flex shrink-0 justify-center py-1">
				<div className="h-4 w-10 rounded-full bg-black" />
			</div>

			{/* Content — no flex-1 to avoid long white space below notifications */}
			<div className="flex flex-col overflow-hidden px-3 pt-2">
				<p className="mb-2.5 text-center font-medium text-[9px] text-muted-foreground uppercase tracking-widest">
					Today
				</p>
				<div className="flex flex-col gap-2">
					<AnimatePresence mode="sync">
						{NOTIFICATIONS.map((notif, i) => (
							<motion.div
								key={`${cycle}-${notif.id}`}
								initial={{ opacity: 0, x: 50, scale: 0.95 }}
								animate={{ opacity: 1, x: 0, scale: 1 }}
								exit={{ opacity: 0, x: -30, scale: 0.95 }}
								transition={{
									duration: 0.35,
									delay: i * 0.55,
									ease: [0.22, 1, 0.36, 1],
								}}
								className={`flex items-center gap-2 overflow-hidden rounded-xl p-2 ${notif.cardClass}`}
							>
								{/* Left accent bar */}
								<div
									className={`h-7 w-[3px] shrink-0 rounded-full ${notif.accentClass}`}
								/>

								{/* Text */}
								<div className="min-w-0 flex-1">
									<p className="truncate font-semibold text-[10px] text-foreground">
										{notif.title}
									</p>
									<p className="truncate text-[9px] text-muted-foreground">
										{notif.subtitle}
									</p>
								</div>

								{/* Icon badge */}
								{notif.icon && (
									<div
										className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${notif.iconBg}`}
									>
										<notif.icon className="h-3 w-3" />
									</div>
								)}
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>

			{/* iOS Home Indicator */}
			<div className="flex shrink-0 justify-center pt-3 pb-2">
				<div className="h-1 w-20 rounded-full bg-foreground/25" />
			</div>
		</div>
	);
}
