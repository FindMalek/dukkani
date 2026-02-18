"use client";

import {
	getTextDirection,
	type Locale,
} from "@dukkani/common/schemas/constants";
import { DirectionProvider } from "@dukkani/ui/components/direction";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";

import { NextIntlClientProvider } from "next-intl";

interface ProvidersProps {
	children: React.ReactNode;
	locale: Locale;
	messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
	return (
		<DirectionProvider direction={getTextDirection(locale)}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</NextIntlClientProvider>
		</DirectionProvider>
	);
}
