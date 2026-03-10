"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { motion } from "framer-motion";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { env } from "@/env";
import { PhoneMockup } from "../shared/phone-mockup";

export function Hero() {
	const t = useTranslations("hero");

	return (
		<section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-transparent to-transparent pt-24 pb-16 md:pt-32 md:pb-32 lg:pt-40">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Badge
							variant="secondary"
							className="mb-6 rounded-full px-4 py-1.5 font-medium text-sm"
						>
							{t("badge")}
						</Badge>
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-6 max-w-4xl font-extrabold text-6xl text-foreground tracking-tight sm:text-5xl lg:text-6xl"
					>
						{t("titleLine1")}{" "}
						<span className="hidden hover:underline sm:inline">
							{t("titleLine2")}
						</span>
						<br />
						<span className="text-primary">
							{t("titleLine3")}{" "}
							<span className="hidden hover:underline sm:inline">
								{t("titleLine4")}
							</span>
						</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
					>
						{t("subtitle")}
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center"
					>
						<Button
							size="lg"
							className="h-12 w-full px-8 text-lg sm:h-14 sm:w-auto"
							asChild
						>
							<Link
								href={
									env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
								}
							>
								{t("ctaPrimary")}
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-12 w-full px-8 text-lg sm:h-14 sm:w-auto"
							asChild
						>
							<Link href={"https://www.youtube.com/watch?v=wkjBCdhxrNc"}>
								<Icons.play className="h-4 w-4" /> {t("ctaSecondary")}
							</Link>
						</Button>
					</motion.div>

					{/* Dynamic Visual */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						className="relative mt-16 w-full max-w-xs sm:mt-20 sm:max-w-sm"
					>
						<PhoneMockup />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
