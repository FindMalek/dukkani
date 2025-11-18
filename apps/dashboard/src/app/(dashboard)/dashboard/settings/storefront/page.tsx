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
				<div className="flex items-center gap-4 mb-4">
					<Link href={RoutePaths.SETTINGS.INDEX}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">
							Storefront Editor
						</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
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
							<label className="text-sm font-medium">Theme</label>
							<p className="text-muted-foreground text-sm">
								Select a theme for your storefront
							</p>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="aspect-video border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
								<p className="text-xs text-muted-foreground">Theme 1</p>
							</div>
							<div className="aspect-video border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
								<p className="text-xs text-muted-foreground">Theme 2</p>
							</div>
							<div className="aspect-video border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
								<p className="text-xs text-muted-foreground">Theme 3</p>
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
							<label className="text-sm font-medium">Store Logo</label>
							<div className="aspect-video border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
								<p className="text-sm text-muted-foreground">
									Logo upload area
								</p>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Favicon</label>
							<div className="w-16 h-16 border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
								<p className="text-xs text-muted-foreground">Icon</p>
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
					<div className="border-2 border-dashed border-muted rounded-lg p-8 flex items-center justify-center min-h-[400px]">
						<p className="text-muted-foreground text-sm">
							Storefront preview will appear here
						</p>
					</div>
				</CardContent>
			</Card>

			<div className="mt-6 flex gap-4">
				<Button disabled>Save Changes</Button>
				<Link href={RoutePaths.SETTINGS.INDEX}>
					<Button variant="outline">Cancel</Button>
				</Link>
			</div>
		</div>
	);
}
