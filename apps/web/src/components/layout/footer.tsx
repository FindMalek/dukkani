"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { LanguageSwitcher } from "@dukkani/ui/components/language-switcher";
import { ModeToggle } from "@dukkani/ui/components/mode-toggle";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
	const t = useTranslations("footer");
	const locale = useLocale();

	return (
		<footer className="border-t bg-muted/30">
			<div className="container mx-auto px-4 py-8 md:py-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<Link
						href={`/${locale}`}
						className="flex items-center gap-2 font-bold text-foreground text-xl"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<Icons.storefront className="h-4 w-4" />
						</div>
						<span>{t("brandName")}</span>
					</Link>

					<nav className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-sm">
						<Link href="#" className="hover:text-foreground">
							{t("terms")}
						</Link>
						<Link href="#" className="hover:text-foreground">
							{t("privacy")}
						</Link>
						<Link href="#" className="hover:text-foreground">
							{t("contact")}
						</Link>
					</nav>

					<div className="flex items-center justify-center gap-3 md:justify-end">
					
						<div className="flex items-center gap-2">
							<ModeToggle />
							<LanguageSwitcher className="h-9 w-9 min-w-9" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
