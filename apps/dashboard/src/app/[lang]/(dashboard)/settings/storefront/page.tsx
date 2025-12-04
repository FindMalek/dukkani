"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

export default function StorefrontSettingsPage() {
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
							Storefront Editor
						</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							Customize your storefront appearance
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Theme Settings</CardTitle>
						<CardDescription>Choose your storefront theme</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="font-medium text-sm">Theme</label>
							<p className="text-muted-foreground text-sm">
								Select a theme for your storefront
							</p>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="flex aspect-video items-center justify-center rounded-lg border-2 border-muted border-dashed">
								<p className="text-muted-foreground text-xs">Theme 1</p>
							</div>
							<div className="flex aspect-video items-center justify-center rounded-lg border-2 border-muted border-dashed">
								<p className="text-muted-foreground text-xs">Theme 2</p>
							</div>
							<div className="flex aspect-video items-center justify-center rounded-lg border-2 border-muted border-dashed">
								<p className="text-muted-foreground text-xs">Theme 3</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Branding</CardTitle>
						<CardDescription>Upload your logo and brand assets</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="font-medium text-sm">Store Logo</label>
							<div className="flex aspect-video items-center justify-center rounded-lg border-2 border-muted border-dashed">
								<p className="text-muted-foreground text-sm">
									Logo upload area
								</p>
							</div>
						</div>
						<div className="space-y-2">
							<label className="font-medium text-sm">Favicon</label>
							<div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-muted border-dashed">
								<p className="text-muted-foreground text-xs">Icon</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Preview</CardTitle>
					<CardDescription>See how your storefront looks</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-muted border-dashed p-8">
						<p className="text-muted-foreground text-sm">
							Storefront preview will appear here
						</p>
					</div>
				</CardContent>
			</Card>

			<div className="mt-6 flex gap-4">
				<Button disabled>Save Changes</Button>
				<Link href={RoutePaths.SETTINGS.INDEX.url}>
					<Button variant="outline">Cancel</Button>
				</Link>
			</div>
		</div>
	);
}
