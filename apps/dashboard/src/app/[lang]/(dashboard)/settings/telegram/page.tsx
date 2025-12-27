"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { TelegramTest } from "@/components/settings/telegram-test";
import { RoutePaths } from "@/lib/routes";

// TODO: Please remove this page and the component below
export default function TelegramSettingsPage() {
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
						<h1 className="font-bold text-2xl md:text-3xl">
							Telegram Notifications
						</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							Link your Telegram account to receive order notifications
						</p>
					</div>
				</div>
			</div>

			<TelegramTest />
		</div>
	);
}
