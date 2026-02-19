"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

type PainPointKey = "wastedTime" | "fakeOrders" | "lostDms" | "manualForms";

const PAIN_POINT_KEYS: {
	key: PainPointKey;
	icon: "clock" | "userX" | "messageSquareX" | "fileText";
}[] = [
	{ key: "wastedTime", icon: "clock" },
	{ key: "fakeOrders", icon: "userX" },
	{ key: "lostDms", icon: "messageSquareX" },
	{ key: "manualForms", icon: "fileText" },
];

export function PainPoints() {
	const t = useTranslations("painPoints");

	return (
		<section
			id="pain-points"
			className="bg-card-foreground py-12 sm:py-16 md:py-24"
		>
			<div className="container mx-auto px-4 sm:px-6">
				<div className="mb-10 text-center sm:mb-12 md:mb-16">
					<h2 className="mb-3 font-bold text-4xl text-primary-foreground tracking-tight sm:mb-4 sm:text-3xl md:text-4xl">
						{t("title")}
					</h2>
					<p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
						{t("subtitle")}
					</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
					{PAIN_POINT_KEYS.map(({ key, icon }) => {
						const Icon = Icons[icon];
						return (
							<Card
								key={key}
								className="border-secondary/20 bg-muted-foreground/20 shadow-none transition-colors"
							>
								<CardHeader className="p-4 sm:p-6">
									<div className="mb-3 p-2.5 text-destructive sm:mb-4 sm:p-3">
										<Icon className="size-7 text-destructive" />
									</div>
									<CardTitle className="font-semibold text-lg text-primary-foreground sm:text-xl">
										{t(`items.${key}.title` as `items.${PainPointKey}.title`)}
									</CardTitle>
									<CardDescription className="text-muted-foreground text-sm sm:text-base">
										{t(
											`items.${key}.description` as `items.${PainPointKey}.description`,
										)}
									</CardDescription>
								</CardHeader>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
