import { DEFAULT_LOCALE, LOCALES, type Locale } from "@dukkani/common/schemas";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get("locale")?.value;

	const finalLocale = LOCALES.includes(cookieLocale as Locale)
		? (cookieLocale as Locale)
		: locale || DEFAULT_LOCALE;

	return {
		locale: finalLocale,
		messages: (
			await import(`@dukkani/common/local/dashboard/${finalLocale}.json`)
		).default,
	};
});
