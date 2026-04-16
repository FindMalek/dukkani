"use client";

import { Toaster } from "@dukkani/ui/components/sonner";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CartStoreProvider } from "@/components/layout/cart-store-provider";
import { env } from "@/env";
import { getQueryClient } from "@/shared/api/orpc";

interface ProvidersProps {
  children: React.ReactNode;
  storeSlug: string;
}

export function Providers({ children, storeSlug }: ProvidersProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <CartStoreProvider storeSlug={storeSlug}>{children}</CartStoreProvider>
        {env.NEXT_PUBLIC_NODE_ENV === "development" && <ReactQueryDevtools />}
      </QueryClientProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}
