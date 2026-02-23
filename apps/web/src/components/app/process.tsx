"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

type ProcessStepKey =
	| "createStore"
	| "shareLink"
	| "weConfirm"
	| "deliveryReady";

const PROCESS_STEPS: {
	key: ProcessStepKey;
	icon: "storefront" | "share2" | "phone" | "packageCheck";
}[] = [
	{ key: "createStore", icon: "storefront" },
	{ key: "shareLink", icon: "share2" },
	{ key: "weConfirm", icon: "phone" },
	{ key: "deliveryReady", icon: "packageCheck" },
];

export function Process() {
	const t = useTranslations("process");

	return (
		<section id="process" className="bg-background py-12 sm:py-16 md:py-24">
			<div className="container mx-auto px-4 sm:px-6">
				<h2 className="mb-14 text-center font-bold text-4xl text-foreground tracking-tight">
					{t("title")}
				</h2>
				<div className="flex flex-col gap-9 lg:grid lg:grid-cols-4 lg:gap-8">
					{PROCESS_STEPS.map(({ key, icon }) => {
						const Icon = Icons[icon];
						return (
							<div
								key={key}
								className="flex flex-row items-start gap-4 sm:gap-6 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
							>
								<div className="flex w-fit shrink-0 items-center justify-center self-start rounded-xl bg-primary p-4 text-primary-foreground lg:self-center dark:bg-primary/20 dark:text-primary-foreground">
									<Icon className="size-8" />
								</div>
								<div className="flex min-w-0 flex-1 flex-col lg:min-w-0 lg:flex-initial">
									<h3 className="font-semibold text-foreground text-xl">
										{t(`steps.${key}.title`)}
									</h3>
									<p className="mt-1 block text-lg text-muted-foreground sm:text-base lg:hidden">
										{t(`steps.${key}.descriptionMobile`)}
									</p>
									<p className="mt-1 hidden text-lg text-muted-foreground sm:text-base lg:block">
										{t(`steps.${key}.descriptionDesktop`)}
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
