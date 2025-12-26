"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import {
	useCreateTelegramLink,
	useTelegramStatus,
} from "@/hooks/api/use-telegram";
import { handleAPIError } from "@/lib/error";

export function TelegramLink() {
	const t = useTranslations("settings.telegram");
	const [deepLink, setDeepLink] = useState<string | null>(null);

	const { data: status, refetch } = useTelegramStatus();
	const createLinkMutation = useCreateTelegramLink();

	const handleCreateLink = () => {
		createLinkMutation.mutate(
			{},
			{
				onSuccess: (data) => {
					setDeepLink(data.deepLink);
				},
				onError: handleAPIError,
			},
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("title")}</CardTitle>
				<CardDescription>{t("description")}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{status?.linked ? (
					<div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
						<p className="text-sm text-green-800 dark:text-green-200">
							✅ {t("linked")}{" "}
							{status.linkedAt
								? new Date(status.linkedAt).toLocaleDateString()
								: t("recently")}
						</p>
					</div>
				) : (
					<div className="space-y-4">
						<Button
							onClick={handleCreateLink}
							disabled={createLinkMutation.isPending}
						>
							📲 {t("linkButton")}
						</Button>

						{deepLink && (
							<div className="space-y-4 rounded-lg border p-4">
								<div>
									<p className="mb-2 text-sm font-medium">{t("option1")}</p>
									<a
										href={deepLink}
										target="_blank"
										rel="noopener noreferrer"
										className="block break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
									>
										{deepLink}
									</a>
								</div>

								<div className="border-t pt-4">
									<p className="mb-2 text-sm font-medium">{t("option2")}</p>
									<div className="flex justify-center rounded bg-white p-4 dark:bg-gray-900">
										<QRCodeSVG value={deepLink} size={200} />
									</div>
								</div>

								<p className="text-xs text-muted-foreground">
									{t("expires")}{" "}
									<a
										href="https://telegram.org"
										target="_blank"
										rel="noopener noreferrer"
										className="underline"
									>
										telegram.org
									</a>
								</p>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
