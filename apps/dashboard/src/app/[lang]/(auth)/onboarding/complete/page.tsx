"use client";

import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthBackground } from "@/components/layout/auth-background";
import { useCopyClipboard } from "@/hooks/use-copy-clipboard";
import { orpc } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default function OnboardingCompletePage() {
	const t = useTranslations("onboarding.complete");
	const copy = useCopyClipboard();
	const searchParams = useSearchParams();
	const storeId = searchParams.get("storeId");

	const { data: completionData, isLoading: isLoadingComplete } = useQuery({
		...orpc.onboarding.complete.queryOptions({
			input: storeId ? { storeId } : undefined,
		}),
	});

	const { data: telegramStatus } = useQuery(
		orpc.telegram.getStatus.queryOptions(),
	);

	const { data: botLinkData } = useQuery({
		...orpc.telegram.getBotLink.queryOptions(),
		enabled: !!completionData && !telegramStatus?.linked,
	});

	if (isLoadingComplete) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="h-8 w-8" />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-background">
			<AuthBackground />

			<div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
				<div className="w-full max-w-md space-y-8">
					<div className="space-y-2 text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
							<Icons.check className="h-6 w-6 text-primary" />
						</div>
						<h1 className="font-semibold text-2xl tracking-tight">
							{t("title")}
						</h1>
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

					<div className="space-y-3 pt-4">
						<Link href={RoutePaths.PRODUCTS.NEW.url} className="w-full">
							<Button className="h-12 w-full gap-2 text-lg shadow-lg shadow-primary/20">
								<Icons.plus className="h-5 w-5" />
								{t("actions.addProduct")}
							</Button>
						</Link>
						<Link href={RoutePaths.DASHBOARD.url} className="w-full">
							<Button variant="ghost" className="h-12 w-full">
								{t("actions.goToDashboard")}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
