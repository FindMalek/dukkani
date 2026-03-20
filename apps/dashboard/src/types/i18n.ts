import type { LOCALES } from "@dukkani/common/schemas";

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof LOCALES)[number];
		Messages: typeof import("@dukkani/common/locale/dashboard/en.json");
	}
}
