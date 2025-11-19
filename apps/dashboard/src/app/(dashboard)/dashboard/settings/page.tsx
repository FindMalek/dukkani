"use client";

import { RoutePaths } from "@/lib/routes";
import Link from "next/link";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";

export default function SettingsPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold md:text-3xl">Settings</h1>
				<p className="text-muted-foreground mt-2 text-sm md:text-base">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Link href={RoutePaths.SETTINGS.PROFILE.url}>
					<Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
						<div className="flex items-center gap-4">
							<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
								<RoutePaths.SETTINGS.PROFILE.icon className="size-6 text-primary" />
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-foreground">
									{RoutePaths.SETTINGS.PROFILE.label}
								</h3>
								<p className="text-sm text-muted-foreground">
									Manage your account profile
								</p>
							</div>
							<Icons.chevronRight className="size-5 text-muted-foreground" />
						</div>
					</Card>
				</Link>

				<Link href={RoutePaths.SETTINGS.PAYMENTS.url}>
					<Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
						<div className="flex items-center gap-4">
							<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
								<RoutePaths.SETTINGS.PAYMENTS.icon className="size-6 text-primary" />
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-foreground">
									{RoutePaths.SETTINGS.PAYMENTS.label}
								</h3>
								<p className="text-sm text-muted-foreground">
									Manage your payment methods
								</p>
							</div>
							<Icons.chevronRight className="size-5 text-muted-foreground" />
						</div>
					</Card>
				</Link>

				<Link href={RoutePaths.SETTINGS.STOREFRONT.url}>
					<Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
						<div className="flex items-center gap-4">
							<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
								<RoutePaths.SETTINGS.STOREFRONT.icon className="size-6 text-primary" />
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-foreground">
									{RoutePaths.SETTINGS.STOREFRONT.label}
								</h3>
								<p className="text-sm text-muted-foreground">
									Manage your storefront
								</p>
							</div>
							<Icons.chevronRight className="size-5 text-muted-foreground" />
						</div>
					</Card>
				</Link>
			</div>
		</div>
	);
}
