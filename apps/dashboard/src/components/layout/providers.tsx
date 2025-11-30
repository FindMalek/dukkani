"use client";

import { Toaster } from "@dukkani/ui/components/sonner";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { dashboardEnv } from "@/env";
import { queryClient } from "@/lib/orpc";

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
				{dashboardEnv.NEXT_PUBLIC_NODE_ENV === "development" && (
					<ReactQueryDevtools />
				)}
			</QueryClientProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
