"use client";

import {
  getTextDirection,
  type Locale,
} from "@dukkani/common/schemas/constants";
import { DirectionProvider } from "@dukkani/ui/components/direction";
import { Toaster } from "@dukkani/ui/components/sonner";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { env } from "@/env";
import { makeQueryClient } from "@/shared/api/orpc";
import NuqsProvider from "./nuqs-provider";

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
  messages: Record<string, any>;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
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
    <NuqsProvider>
      <DirectionProvider dir={getTextDirection(locale)}>
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
              {children}
              {env.NEXT_PUBLIC_NODE_ENV === "development" && (
                <ReactQueryDevtools />
              )}
            </QueryClientProvider>
            <Toaster richColors />
          </ThemeProvider>
        </NextIntlClientProvider>
      </DirectionProvider>
    </NuqsProvider>
  );
}
