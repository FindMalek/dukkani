"use client";

import type { Locale } from "@dukkani/common/schemas/constants";
import { Toaster } from "@dukkani/ui/components/sonner";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { dashboardEnv } from "@/env";
import { queryClient } from "@/lib/orpc";

interface ProvidersProps {
	children: React.ReactNode;
	locale: string;
	messages: Record<string, any>;
}

export default function Providers({
	children,
	locale,
	messages,
}: ProvidersProps) {
	return (
		<NextIntlClientProvider locale={locale as Locale} messages={messages}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<QueryClientProvider client={queryClient}>
					{children}
					{dashboardEnv.NEXT_PUBLIC_NODE_ENV === "development" && (
						<ReactQueryDevtools />
					)}
				</QueryClientProvider>
				<Toaster richColors />
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
