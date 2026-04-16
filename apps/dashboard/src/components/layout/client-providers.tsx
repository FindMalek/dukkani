"use client";

import { type Locale } from "@dukkani/common/schemas/constants";
import { Toaster } from "@dukkani/ui/components/sonner";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { toast } from "sonner";
import { env } from "@/env";
import { makeQueryClient } from "@/shared/api/orpc";

export function ClientProviders({ children }: React.PropsWithChildren) {
  // Create a per-render QueryClient (NOT a module singleton) to prevent
  // cross-request state leaks in SSR. The onError callback wires up the
  // global toast so all query errors are caught in one place.
  const [queryClient] = useState(() =>
    makeQueryClient((error) =>
      toast.error(`Error: ${error.message}`, {
        action: {
          label: "retry",
          onClick: () => {
            queryClient.invalidateQueries();
          },
        },
      }),
    ),
  );

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
