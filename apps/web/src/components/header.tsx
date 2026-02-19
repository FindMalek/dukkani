import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { env } from "@/env";

export async function Header() {
	const t = await getTranslations("header");

	return (
		<header className="fixed top-0 z-50 w-full border-secondary border-b bg-background/80 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link
					href="/"
					className="flex items-center gap-2 font-bold text-foreground text-xl"
				>
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<Icons.storefront className="h-5 w-5" />
					</div>
					<span>{t("brandName")}</span>
				</Link>

				<div className="flex items-center gap-8">
					<Link
						href="#features"
						className="hidden font-medium text-muted-foreground text-sm transition-colors hover:text-foreground md:block"
					>
						{t("features")}
					</Link>
					<Link
						href="#pricing"
						className="hidden font-medium text-muted-foreground text-sm transition-colors hover:text-foreground md:block"
					>
						{t("pricing")}
					</Link>
					<Button
						asChild
						className="rounded-full bg-primary px-6 py-2 font-bold text-primary-foreground"
					>
						<Link href={env.NEXT_PUBLIC_DASHBOARD_URL}>
							{t("startSelling")}
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
