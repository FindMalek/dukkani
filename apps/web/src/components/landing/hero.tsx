"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { motion } from "framer-motion";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { webEnv } from "@/env";

export function Hero() {
	const t = useTranslations("common");
	return (
		<section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-32 lg:pt-40">
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
							WhatsApp Official Partner
						</Badge>
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-6 max-w-4xl font-extrabold text-4xl text-foreground tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
					>
						The Future of <br className="hidden sm:block" />
						<span className="text-primary">WhatsApp Commerce</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
					>
						Turn your WhatsApp into a powerful sales channel. Automated orders,
						seamless payments, and instant customer connection.
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
									webEnv.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
								}
							>
								Start for free
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-12 w-full px-8 text-lg sm:h-14 sm:w-auto"
						>
							Watch Demo
						</Button>
					</motion.div>

					{/* Dynamic Visual */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						className="relative mt-12 w-full max-w-5xl sm:mt-16"
					>
						<div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl border bg-background shadow-2xl sm:aspect-video">
							{/* Mockup UI - Chat Interface */}
							<div className="flex h-full w-full flex-col md:flex-row">
								{/* Sidebar (Hidden on mobile) */}
								<div className="hidden w-1/3 border-r bg-muted/30 p-4 md:block">
									<div className="mb-4 h-8 w-24 rounded bg-muted-foreground/20" />
									<div className="space-y-3">
										{[1, 2, 3].map((i) => (
											<div
												key={i}
												className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50"
											>
												<div className="h-10 w-10 rounded-full bg-muted-foreground/10" />
												<div className="space-y-1">
													<div className="h-3 w-24 rounded bg-muted-foreground/20" />
													<div className="h-2 w-16 rounded bg-muted-foreground/10" />
												</div>
											</div>
										))}
									</div>
								</div>
								{/* Main Chat Area */}
								<div className="flex flex-1 flex-col bg-background">
									{/* Chat Header */}
									<div className="flex items-center border-b p-3 sm:p-4">
										<div className="flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
												<Icons.storefront className="h-5 w-5" />
											</div>
											<div>
												<div className="font-semibold">Dukkani Store</div>
												<div className="text-muted-foreground text-xs">
													Official Business Account
												</div>
											</div>
										</div>
									</div>
									{/* Chat Messages */}
									<div className="flex-1 space-y-4 p-3 sm:p-4">
										<div className="flex justify-start">
											<div className="max-w-[85%] rounded-2xl rounded-tl-none bg-muted p-3 sm:max-w-[80%]">
												<p className="text-sm">
													Hi! Welcome to Dukkani Store. How can we help you
													today?
												</p>
											</div>
										</div>
										<div className="flex justify-end">
											<div className="max-w-[85%] rounded-2xl rounded-tr-none bg-primary p-3 text-primary-foreground sm:max-w-[80%]">
												<p className="text-sm">
													I'd like to order the Premium Package.
												</p>
											</div>
										</div>
										<div className="flex justify-start">
											<div className="max-w-[90%] rounded-2xl rounded-tl-none bg-muted p-3 sm:max-w-[80%]">
												<div className="space-y-2">
													<p className="font-medium text-sm">Order Summary</p>
													<div className="h-20 w-full rounded bg-background/50" />
													<Button size="sm" className="w-full">
														Checkout Now
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Floating Elements */}
						<div className="-right-4 -top-12 lg:-right-12 absolute hidden animate-bounce rounded-lg border bg-background p-3 shadow-lg md:block">
							<div className="flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
									<Icons.check className="h-4 w-4" />
								</div>
								<div className="font-semibold text-sm">Order Received!</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
			<p className="text-center text-4xl text-muted-foreground">
				{t("description")}
			</p>
		</section>
	);
}
