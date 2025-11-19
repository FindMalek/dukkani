"use client";

import { Toaster } from "@dukkani/ui/components/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils/orpc";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { env } from "@dukkani/env";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				{children}
				{env.NEXT_PUBLIC_NODE_ENV === "development" && <ReactQueryDevtools />}
			</QueryClientProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
