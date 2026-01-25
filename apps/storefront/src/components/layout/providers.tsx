"use client";

import type { Locale } from "@dukkani/common/schemas/constants";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";
import { env } from "@/env";
import { getQueryClient } from "@/lib/orpc";
import { CartHydrationProvider } from "./cart-hydration-provider";

interface ProvidersProps {
	children: React.ReactNode;
	locale: Locale;
	// biome-ignore lint/suspicious/noExplicitAny: messages is a Record<string, any>
	messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
	const [queryClient] = useState(() => getQueryClient());

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			timeZone="Africa/Tunis"
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<QueryClientProvider client={queryClient}>
					<CartHydrationProvider>{children}</CartHydrationProvider>
					{env.NEXT_PUBLIC_NODE_ENV === "development" && <ReactQueryDevtools />}
				</QueryClientProvider>
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
