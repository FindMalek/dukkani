import enMessages from "@dukkani/common/locale/web/en.json";
import frMessages from "@dukkani/common/locale/web/fr.json";
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
} as const;

export default getRequestConfig(async ({ locale }) => {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get("locale")?.value;

	const finalLocale = LOCALES.includes(cookieLocale as Locale)
		? (cookieLocale as Locale)
		: locale || DEFAULT_LOCALE;

	return {
		locale: finalLocale,
		messages: messages[finalLocale],
	};
});
