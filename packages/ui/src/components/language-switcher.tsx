"use client";

import {
	LOCALES,
	LOCALES_MAP,
	type Locale,
} from "@dukkani/common/schemas/constants";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

interface LanguageSwitcherProps {
	variant?: "buttons" | "select";
	className?: string;
}

export function LanguageSwitcher({
	variant = "select",
	className,
}: LanguageSwitcherProps) {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();
	const t = useTranslations("common");

	const switchLanguage = (newLocale: Locale) => {
		// Replace the current locale in the pathname
		const segments = pathname.split("/");
		segments[1] = newLocale; // [lang] is always at index 1
		const newPath = segments.join("/");

		router.push(newPath);
	};

	if (variant === "buttons") {
		return (
			<div className={`flex gap-1 ${className}`}>
				{LOCALES.map((locale) => (
					<Button
						key={locale}
						variant={currentLocale === locale ? "default" : "outline"}
						size="sm"
						onClick={() => switchLanguage(locale)}
						className="min-w-[100px]"
					>
						{LOCALES_MAP[locale]}
					</Button>
				))}
			</div>
		);
	}

	return (
		<Select value={currentLocale} onValueChange={switchLanguage}>
			<SelectTrigger className={`${className}`}>
				<Globe className="mr-2 h-4 w-4" />
			</SelectTrigger>
			<SelectContent>
				{LOCALES.map((locale) => (
					<SelectItem key={locale} value={locale}>
						{LOCALES_MAP[locale]}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
