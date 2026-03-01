import arMessages from "@dukkani/common/locale/storefront/ar.json";
import enMessages from "@dukkani/common/locale/storefront/en.json";
import frMessages from "@dukkani/common/locale/storefront/fr.json";
import {
	DEFAULT_LOCALE,
	LOCALES,
	type Locale,
} from "@dukkani/common/schemas/constants";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

type MessagesMap = {
	[K in Locale]: typeof enMessages;
};

const messages: MessagesMap = {
	en: enMessages,
	fr: frMessages,
	ar: arMessages,
} as const;

export default getRequestConfig(async ({ locale }) => {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get("locale")?.value;

	const finalLocale: Locale = LOCALES.includes(cookieLocale as Locale)
		? (cookieLocale as Locale)
		: LOCALES.includes(locale as Locale)
			? (locale as Locale)
			: DEFAULT_LOCALE;

	return {
		locale: finalLocale,
		messages: messages[finalLocale],
		timeZone: "Africa/Tunis",
	};
});
