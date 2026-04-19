"use client";

import { DirectionProvider } from "@dukkani/ui/components/direction";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { useT } from "next-i18next/client";

interface ProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ProvidersProps) {
  const { i18n } = useT();
  return (
    <DirectionProvider dir={i18n.dir()}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </DirectionProvider>
  );
}
