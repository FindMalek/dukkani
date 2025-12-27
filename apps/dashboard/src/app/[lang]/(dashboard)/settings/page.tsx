"use client";

import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

export default function SettingsPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="font-bold text-2xl md:text-3xl">Settings</h1>
				<p className="mt-2 text-muted-foreground text-sm md:text-base">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Link href={RoutePaths.SETTINGS.PROFILE.url}>
					<Card className="cursor-pointer p-4 transition-colors hover:bg-accent">
						<div className="flex items-center gap-4">
							<div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
								<RoutePaths.SETTINGS.PROFILE.icon className="size-6 text-primary" />
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="font-semibold text-foreground">
									{RoutePaths.SETTINGS.PROFILE.label}
								</h3>
								<p className="text-muted-foreground text-sm">
									Manage your account profile
								</p>
							</div>
							<Icons.chevronRight className="size-5 text-muted-foreground" />
						</div>
					</Card>
				</Link>

				<Link href={RoutePaths.SETTINGS.PAYMENTS.url}>
					<Card className="cursor-pointer p-4 transition-colors hover:bg-accent">
						<div className="flex items-center gap-4">
							<div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
								<RoutePaths.SETTINGS.PAYMENTS.icon className="size-6 text-primary" />
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="font-semibold text-foreground">
									{RoutePaths.SETTINGS.PAYMENTS.label}
								</h3>
								<p className="text-muted-foreground text-sm">
									Manage your payment methods
								</p>
							</div>
							<Icons.chevronRight className="size-5 text-muted-foreground" />
						</div>
					</Card>
				</Link>

				<Link href={RoutePaths.SETTINGS.STOREFRONT.url}>
					<Card className="cursor-pointer p-4 transition-colors hover:bg-accent">
						<div className="flex items-center gap-4">
							<div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
								<RoutePaths.SETTINGS.STOREFRONT.icon className="size-6 text-primary" />
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="font-semibold text-foreground">
									{RoutePaths.SETTINGS.STOREFRONT.label}
								</h3>
								<p className="text-muted-foreground text-sm">
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
