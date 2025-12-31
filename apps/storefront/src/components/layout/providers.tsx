"use client";

import type { Locale } from "@dukkani/common/schemas/constants";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { storefrontEnv } from "@/env";
import { queryClient } from "@/lib/orpc";

interface ProvidersProps {
	children: React.ReactNode;
	locale: Locale;
	messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
	return (
		<NextIntlClientProvider locale={locale} messages={messages}
		timeZone="Africa/Tunis">
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<QueryClientProvider client={queryClient}>
					{children}
					{storefrontEnv.NEXT_PUBLIC_NODE_ENV === "development" && (
						<ReactQueryDevtools />
					)}
				</QueryClientProvider>
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
