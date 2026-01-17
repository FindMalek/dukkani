"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@dukkani/ui/components/alert-dialog";
import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Label } from "@dukkani/ui/components/label";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import {
	useDisconnectTelegramMutation,
	useTelegramBotLinkQuery,
	useTelegramStatusQuery,
} from "@/hooks/api/use-telegram.hook";
import { RoutePaths } from "@/lib/routes";

export default function TelegramSettingsPage() {
	const t = useTranslations("settings.telegram");
	const [disconnectOpen, setDisconnectOpen] = useState(false);
	const [storeName, setStoreName] = useState("");

	const { data: telegramStatus, isLoading: statusLoading } =
		useTelegramStatusQuery();

	const { data: stores, isLoading: storesLoading } = useStoresQuery();

	const { data: botLinkData } = useTelegramBotLinkQuery(
		!telegramStatus?.linked,
	);

	const disconnectMutation = useDisconnectTelegramMutation();

	const handleDisconnect = () => {
		if (disconnectMutation.isPending) {
			return;
		}

		if (!storeName.trim()) {
			toast.error(t("storeNameRequired"));
			return;
		}
		disconnectMutation.mutate(
			{ storeName: storeName.trim() },
			{
				onSuccess: () => {
					toast.success(t("disconnectSuccess"));
					setDisconnectOpen(false);
					setStoreName("");
				},
				onError: (error: Error) => {
					toast.error(error.message || t("error"));
				},
			},
		);
	};

	if (statusLoading || storesLoading) {
		return (
			<div className="container mx-auto max-w-7xl p-4 md:p-6">
				<div className="flex items-center justify-center py-12">
					<Icons.spinner className="h-8 w-8 animate-spin" />
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="mb-4 flex items-center gap-4">
					<Link href={RoutePaths.SETTINGS.INDEX.url}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							{t("description")}
						</p>
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icons.telegram className="h-5 w-5 text-[#0088cc]" />
						{t("title")}
					</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{telegramStatus?.linked ? (
						<>
							<div className="space-y-2">
								<Label>{t("linked")}</Label>
								<p className="text-muted-foreground text-sm">
									{telegramStatus.linkedAt
										? new Date(telegramStatus.linkedAt).toLocaleDateString()
										: t("recently")}
								</p>
							</div>

							<div className="space-y-4">
								<Label>{t("disconnectTitle")}</Label>
								<p className="text-muted-foreground text-sm">
									{t("disconnectDescription")}
								</p>
								{stores && stores.length > 0 && (
									<div className="space-y-2">
										<p className="text-muted-foreground text-xs">
											{t("yourStores")} {stores.map((s) => s.name).join(", ")}
										</p>
									</div>
								)}
								<Button
									variant="destructive"
									onClick={() => setDisconnectOpen(true)}
								>
									{t("disconnectButton")}
								</Button>
							</div>
						</>
					) : (
						<div className="space-y-4">
							<p className="text-muted-foreground text-sm">
								{t("disconnectNotLinked")}
							</p>
							{botLinkData && (
								<div className="space-y-4 rounded-xl border bg-muted/20 p-6">
									<div className="flex flex-col gap-2">
										<p className="font-medium text-muted-foreground text-xs uppercase">
											{t("otpCode")}
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
												{t("linkButton")}
											</Button>
										</div>
										<p className="text-[10px] text-muted-foreground">
											{botLinkData.instructions}
										</p>
									</div>
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			<AlertDialog open={disconnectOpen} onOpenChange={setDisconnectOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("disconnectTitle")}</AlertDialogTitle>
						<AlertDialogDescription>
							{t("disconnectDescription")}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="space-y-4 py-4">
						{stores && stores.length > 0 && (
							<div className="space-y-2">
								<p className="text-muted-foreground text-xs">
									{t("yourStores")} {stores.map((s) => s.name).join(", ")}
								</p>
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="storeName">{t("storeNameLabel")}</Label>
							<Input
								id="storeName"
								placeholder={t("disconnectPlaceholder")}
								value={storeName}
								onChange={(e) => setStoreName(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleDisconnect();
									}
								}}
							/>
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel>{t("cancelButton")}</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDisconnect}
							isLoading={disconnectMutation.isPending}
							disabled={!storeName.trim()}
						>
							{t("disconnectButton")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
