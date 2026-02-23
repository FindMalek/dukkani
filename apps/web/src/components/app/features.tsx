"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

type FeatureKey =
	| "telegramAlerts"
	| "recoverOrders"
	| "massNotify"
	| "customDomain"
	| "instagramBioLink"
	| "seoReady"
	| "trustDelivery"
	| "cleanDashboard"
	| "invoicingReady";

const FEATURES: { key: FeatureKey; icon: keyof typeof Icons }[] = [
	{ key: "telegramAlerts", icon: "bell" },
	{ key: "recoverOrders", icon: "refreshCw" },
	{ key: "massNotify", icon: "megaphone" },
	{ key: "customDomain", icon: "globe" },
	{ key: "instagramBioLink", icon: "instagram" },
	{ key: "seoReady", icon: "search" },
	{ key: "trustDelivery", icon: "truck" },
	{ key: "cleanDashboard", icon: "layoutDashboard" },
	{ key: "invoicingReady", icon: "fileText" },
];

export function Features() {
	const t = useTranslations("features");

	return (
		<section id="features" className="bg-muted/30 py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center md:mb-16">
					<h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
						{t("title")}
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{t("subtitle")}
					</p>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map(({ key, icon }) => {
						const Icon = Icons[icon];
						return (
							<div key={key} className="flex flex-row items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12 dark:bg-primary/20">
									<Icon className="h-5 w-5 sm:h-6 sm:w-6" />
								</div>
								<div className="min-w-0 flex-1">
									<h3 className="font-semibold text-foreground text-lg">
										{t(`items.${key}.title`)}
									</h3>
									<p className="mt-1 block text-muted-foreground text-sm lg:hidden">
										{t(
											`items.${key}.descriptionMobile`,
										)}
									</p>
									<p className="mt-1 hidden text-muted-foreground text-sm lg:block">
										{t(
											`items.${key}.descriptionDesktop`,
										)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
