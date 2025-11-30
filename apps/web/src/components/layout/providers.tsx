"use client";

import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";

interface ProvidersProps {
	children: React.ReactNode;
	locale: string;
	messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
	return (
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
	);
}
