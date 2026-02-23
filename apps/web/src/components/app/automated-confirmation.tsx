"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

const BENEFITS_COUNT = 3;
const FLOWCHART_STEPS_COUNT = 6;

export function AutomatedConfirmation() {
	const t = useTranslations("automatedConfirmation");

	return (
		<section
			id="automated-confirmation"
			className="bg-primary/5 py-12 sm:py-16 md:py-24 dark:bg-primary/10"
		>
			<div className="container mx-auto px-4 sm:px-6">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
					{/* Left column: copy + benefits + guarantee */}
					<div className="flex flex-col gap-8">
						<p className="font-medium text-primary text-sm uppercase tracking-wider">
							{t("eyebrow")}
						</p>
						<h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
							{t("title")}
						</h2>
						<p className="text-lg text-muted-foreground">{t("description")}</p>
						<ul className="flex flex-col gap-3">
							{Array.from({ length: BENEFITS_COUNT }, (_, i) => (
								<li key={i} className="flex items-center gap-3 text-foreground">
									<Icons.check className="h-5 w-5 shrink-0 text-primary" />
									<span>{t(`benefits.${i}`)}</span>
								</li>
							))}
						</ul>
						<Card className="border-primary/20 bg-background dark:border-primary/30">
							<CardHeader className="flex flex-row items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
									<Icons.shieldCheck className="h-5 w-5" />
								</div>
								<div>
									<CardTitle className="text-lg">
										{t("guarantee.title")}
									</CardTitle>
									<CardDescription className="mt-1">
										{t("guarantee.description")}
									</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</div>

					{/* Right column: flowchart */}
					<Card className="border-border bg-background shadow-sm">
						<CardHeader>
							<CardTitle className="rounded-lg bg-primary/10 px-4 py-2 text-center font-semibold text-primary">
								{t("flowchart.title")}
							</CardTitle>
						</CardHeader>
						<div className="flex flex-col gap-0 px-6 pb-6">
							{Array.from({ length: FLOWCHART_STEPS_COUNT }, (_, i) => (
								<div key={i} className="flex flex-col items-center">
									<div className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-center font-medium text-foreground text-sm">
										{t(`flowchart.steps.${i}`)}
									</div>
									{i < FLOWCHART_STEPS_COUNT - 1 && (
										<Icons.chevronDown className="my-1 h-4 w-4 text-primary" />
									)}
								</div>
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
