"use client";

import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useOnboardingCompleteQuery } from "@/hooks/api/use-onboarding.hook";
import {
	useTelegramBotLinkQuery,
	useTelegramStatusQuery,
} from "@/hooks/api/use-telegram.hook";
import { useCopyClipboard } from "@/hooks/use-copy-clipboard";
import { RoutePaths } from "@/lib/routes";

export function OnboardingCompletion({ storeId }: { storeId: string }) {
	const t = useTranslations("onboarding.complete");
	const copy = useCopyClipboard();

	const { data: completionData, isLoading: isLoadingComplete } =
		useOnboardingCompleteQuery({ storeId });

	const { data: telegramStatus } = useTelegramStatusQuery();

	const { data: botLinkData } = useTelegramBotLinkQuery(
		!!completionData && !telegramStatus?.linked,
	);

	if (isLoadingComplete) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="h-8 w-8" />
			</div>
		);
	}

	return (
		<>
			<div className="space-y-2 text-center">
				<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
					<Icons.check className="h-6 w-6 text-primary" />
				</div>
				<h1 className="font-semibold text-2xl tracking-tight">{t("title")}</h1>
				<p className="text-muted-foreground">{t("subtitle")}</p>
			</div>

			<Card className="space-y-4 border-2 border-dashed bg-muted/30 p-6">
				<p className="text-center font-medium text-sm">
					{t("storeLink.label")}
				</p>
				<div className="flex items-center gap-2 rounded-md border bg-background p-2 pl-4">
					<span className="flex-1 truncate font-mono text-muted-foreground text-sm">
						{completionData?.storeUrl}
					</span>
					<Button
						size="icon"
						variant="ghost"
						onClick={() =>
							copy(completionData?.storeUrl || "", t("storeLink.copied"))
						}
					>
						<Icons.copy className="h-4 w-4" />
					</Button>
				</div>
			</Card>

			{!telegramStatus?.linked && botLinkData && (
				<div className="space-y-4 rounded-xl border bg-muted/20 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0088cc]/10">
							<Icons.telegram className="h-5 w-5 text-[#0088cc]" />
						</div>
						<p className="font-semibold">{t("telegram.title")}</p>
					</div>
					<p className="text-muted-foreground text-sm">
						{t("telegram.description")}
					</p>
					<div className="flex flex-col gap-2">
						<p className="font-medium text-muted-foreground text-xs uppercase">
							{t("telegram.otpLabel")}
						</p>
						<div className="flex items-center gap-2">
							<code className="flex-1 rounded-md border bg-background p-2 text-center font-bold text-lg tracking-widest">
								{botLinkData.otpCode}
							</code>
							<Button
								variant="outline"
								className="gap-2"
								onClick={() =>
									window.open(
										`${botLinkData.botLink}?start=link_${botLinkData.otpCode}`,
										"_blank",
									)
								}
							>
								{t("telegram.connectButton")}
							</Button>
						</div>
						<p className="text-[10px] text-muted-foreground">
							{t("telegram.instructions", {
								code: botLinkData.otpCode,
							})}
						</p>
					</div>
				</div>
			)}

			<div className="flex flex-col items-center gap-4">
				<Button asChild className="w-full">
					<Link href={RoutePaths.PRODUCTS.NEW.url}>
						<Icons.plus className="h-5 w-5" />
						{t("actions.addProduct")}
					</Link>
				</Button>
				<Button variant="outline" asChild className="w-full">
					<Link href={RoutePaths.DASHBOARD.url}>
						{t("actions.goToDashboard")}
					</Link>
				</Button>
			</div>
		</>
	);
}
