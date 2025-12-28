"use client";

import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthBackground } from "@/components/layout/auth-background";
import { orpc } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default function OnboardingCompletePage() {
	const searchParams = useSearchParams();
	const storeId = searchParams.get("storeId");

	const { data: completionData, isLoading } = orpc.onboarding.complete.useQuery(
		{ storeId: storeId || undefined },
		{ enabled: true },
	);

	const { data: telegramStatus } = orpc.telegram.getStatus.useQuery(undefined, {
		enabled: true,
	});

	const { data: botLinkData } = orpc.telegram.getBotLink.useQuery(undefined, {
		enabled: !!completionData && !telegramStatus?.linked,
	});

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Link copied to clipboard!");
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Icons.spinner className="h-8 w-8 animate-spin" />
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
							You're all set!
						</h1>
						<p className="text-muted-foreground">
							Your store is ready to start receiving orders.
						</p>
					</div>

					<Card className="space-y-4 border-2 border-dashed bg-muted/30 p-6">
						<p className="text-center font-medium text-sm">Your Store Link</p>
						<div className="flex items-center gap-2 rounded-md border bg-background p-2 pl-4">
							<span className="flex-1 truncate font-mono text-muted-foreground text-sm">
								{completionData?.storeUrl}
							</span>
							<Button
								size="icon"
								variant="ghost"
								onClick={() => copyToClipboard(completionData?.storeUrl || "")}
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
								<p className="font-semibold">Instant Order Alerts</p>
							</div>
							<p className="text-muted-foreground text-sm">
								Connect your Telegram to get notified the second a customer
								places an order.
							</p>
							<div className="flex flex-col gap-2">
								<p className="font-medium text-muted-foreground text-xs uppercase">
									Your OTP Code
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
										Connect
									</Button>
								</div>
								<p className="text-[10px] text-muted-foreground">
									Send{" "}
									<span className="font-mono">/link {botLinkData.otpCode}</span>{" "}
									to the bot if you're not redirected.
								</p>
							</div>
						</div>
					)}

					<div className="space-y-3 pt-4">
						<Link href={RoutePaths.PRODUCTS.NEW.url} className="w-full">
							<Button className="h-12 w-full gap-2 text-lg shadow-lg shadow-primary/20">
								<Icons.plus className="h-5 w-5" />
								Add Your First Product
							</Button>
						</Link>
						<Link href={RoutePaths.DASHBOARD.url} className="w-full">
							<Button variant="ghost" className="h-12 w-full">
								Go to Dashboard
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
