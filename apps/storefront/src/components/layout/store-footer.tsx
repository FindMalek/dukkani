import { LanguageSwitcher } from "@dukkani/ui/components/language-switcher";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { env } from "@/env";

export async function StoreFooter() {
	const t = await getTranslations("storefront.store.footer");

	return (
		<footer className="border-border/30 border-t bg-background pb-20">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
					<p className="text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()}{" "}
						{t("copyright", { defaultValue: "All rights reserved" })}
					</p>
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
						<LanguageSwitcher variant="select" className="w-fit" />
						<p className="text-muted-foreground text-sm">
							<Link
								href={env.NEXT_PUBLIC_WEB_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground hover:underline"
							>
								{t("poweredBy", {
									defaultValue: "Powered by",
								})}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
