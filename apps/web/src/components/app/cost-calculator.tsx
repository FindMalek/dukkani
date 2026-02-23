"use client";

import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent, CardHeader } from "@dukkani/ui/components/card";
import { Label } from "@dukkani/ui/components/label";
import { Slider } from "@dukkani/ui/components/slider";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { env } from "@/env";

const ORDERS_MIN = 1;
const ORDERS_MAX = 50;
const FAKE_PCT_MIN = 0;
const FAKE_PCT_MAX = 100;
const MINS_MIN = 1;
const MINS_MAX = 30;
const COST_MIN = 1;
const COST_MAX = 30;

const DAYS_PER_MONTH = 30;
const SAVINGS_RATIO = 900 / 1080; // ~0.833 so default (15,20,10,12) → 1080 TND lost → 900 saved

function useCostCalculatorState() {
	const [ordersPerDay, setOrdersPerDay] = useState(15);
	const [fakeOrdersPct, setFakeOrdersPct] = useState(20);
	const [minutesPerCall, setMinutesPerCall] = useState(10);
	const [failedCostTnd, setFailedCostTnd] = useState(12);

	const hoursWasted = useMemo(
		() => ordersPerDay * DAYS_PER_MONTH * (minutesPerCall / 60),
		[ordersPerDay, minutesPerCall],
	);
	const moneyLost = useMemo(
		() => ordersPerDay * DAYS_PER_MONTH * (fakeOrdersPct / 100) * failedCostTnd,
		[ordersPerDay, fakeOrdersPct, failedCostTnd],
	);
	const estimatedSavings = useMemo(
		() => Math.round(moneyLost * SAVINGS_RATIO),
		[moneyLost],
	);

	return {
		ordersPerDay,
		setOrdersPerDay,
		fakeOrdersPct,
		setFakeOrdersPct,
		minutesPerCall,
		setMinutesPerCall,
		failedCostTnd,
		setFailedCostTnd,
		hoursWasted,
		moneyLost,
		estimatedSavings,
	};
}

export function CostCalculator() {
	const t = useTranslations("costCalculator");
	const {
		ordersPerDay,
		setOrdersPerDay,
		fakeOrdersPct,
		setFakeOrdersPct,
		minutesPerCall,
		setMinutesPerCall,
		failedCostTnd,
		setFailedCostTnd,
		hoursWasted,
		moneyLost,
		estimatedSavings,
	} = useCostCalculatorState();

	return (
		<section
			id="cost-calculator"
			className="bg-primary/5 py-12 sm:py-16 md:py-24 dark:bg-primary/10"
		>
			<div className="container mx-auto px-4 sm:px-6">
				<Card className="mx-auto max-w-4xl border-border bg-card shadow-sm">
					<CardHeader className="text-center">
						<h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-3xl">
							{t("title")}
						</h2>
					</CardHeader>
					<CardContent className="grid gap-8 pt-0 pb-8 lg:grid-cols-2 lg:gap-10">
						{/* Left: sliders */}
						<div className="flex flex-col gap-6">
							{/* Orders per day */}
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-4">
									<Label
										id="cost-orders-per-day-label"
										className="font-normal text-muted-foreground text-sm"
									>
										{t("ordersPerDayLabel")}
									</Label>
									<span className="font-semibold text-foreground text-sm tabular-nums">
										{ordersPerDay} {t("ordersPerDaySuffix")}
									</span>
								</div>
								<Slider
									aria-labelledby="cost-orders-per-day-label"
									min={ORDERS_MIN}
									max={ORDERS_MAX}
									step={1}
									value={[ordersPerDay]}
									onValueChange={([v]) => setOrdersPerDay(v ?? ordersPerDay)}
								/>
							</div>

							{/* Fake orders % - destructive styling */}
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-4">
									<Label
										id="cost-fake-orders-label"
										className="font-normal text-muted-foreground text-sm"
									>
										{t("fakeOrdersLabel")}
									</Label>
									<span className="font-semibold text-foreground text-sm tabular-nums">
										{fakeOrdersPct}
										{t("fakeOrdersSuffix")}
									</span>
								</div>
								<div className="**:data-[slot=slider-thumb]:border-destructive **:data-[slot=slider-range]:bg-destructive">
									<Slider
										aria-labelledby="cost-fake-orders-label"
										min={FAKE_PCT_MIN}
										max={FAKE_PCT_MAX}
										step={5}
										value={[fakeOrdersPct]}
										onValueChange={([v]) =>
											setFakeOrdersPct(v ?? fakeOrdersPct)
										}
									/>
								</div>
							</div>

							{/* Minutes per call */}
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-4">
									<Label
										id="cost-mins-per-call-label"
										className="font-normal text-muted-foreground text-sm"
									>
										{t("minutesPerCallLabel")}
									</Label>
									<span className="font-semibold text-foreground text-sm tabular-nums">
										{minutesPerCall} {t("minutesPerCallSuffix")}
									</span>
								</div>
								<Slider
									aria-labelledby="cost-mins-per-call-label"
									min={MINS_MIN}
									max={MINS_MAX}
									step={1}
									value={[minutesPerCall]}
									onValueChange={([v]) =>
										setMinutesPerCall(v ?? minutesPerCall)
									}
								/>
							</div>

							{/* Failed delivery cost */}
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-4">
									<Label
										id="cost-failed-tnd-label"
										className="font-normal text-muted-foreground text-sm"
									>
										{t("failedCostLabel")}
									</Label>
									<span className="font-semibold text-foreground text-sm tabular-nums">
										{failedCostTnd} {t("failedCostSuffix")}
									</span>
								</div>
								<Slider
									aria-labelledby="cost-failed-tnd-label"
									min={COST_MIN}
									max={COST_MAX}
									step={1}
									value={[failedCostTnd]}
									onValueChange={([v]) => setFailedCostTnd(v ?? failedCostTnd)}
								/>
							</div>
						</div>

						{/* Right: results + CTA */}
						<div className="flex flex-col gap-6">
							<div className="rounded-lg bg-muted/60 p-6 dark:bg-muted/40">
								<div className="mb-4">
									<p className="text-muted-foreground text-xs uppercase tracking-wider">
										{t("hoursWastedLabel")}
									</p>
									<p className="font-bold text-2xl text-destructive tabular-nums">
										{Math.round(hoursWasted).toLocaleString()} hrs
									</p>
								</div>
								<div className="mb-4">
									<p className="text-muted-foreground text-xs uppercase tracking-wider">
										{t("moneyLostLabel")}
									</p>
									<p className="font-bold text-2xl text-destructive tabular-nums">
										{moneyLost.toLocaleString()} {t("failedCostSuffix")}
									</p>
								</div>
								<div className="rounded-md bg-primary/10 p-3 dark:bg-primary/20">
									<p className="text-primary text-xs uppercase tracking-wider">
										{t("savingsLabel")}
									</p>
									<p className="font-bold text-2xl text-primary tabular-nums">
										{t("savingsPrefix")}
										{estimatedSavings.toLocaleString()} {t("failedCostSuffix")}{" "}
										{t("perMonth")}
									</p>
								</div>
							</div>
							<Button
								size="lg"
								className="w-full font-semibold text-base"
								asChild
							>
								<Link
									href={
										env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
									}
								>
									{t("cta")}
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
