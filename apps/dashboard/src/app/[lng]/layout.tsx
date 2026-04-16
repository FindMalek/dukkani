import "@dukkani/ui/styles/globals.css";

import { I18nextDashboardConfig } from "@dukkani/i18n/dashboard";
import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import { I18nProvider } from "next-i18next/client";
import {
  generateI18nStaticParams,
  getResources,
  getT,
  initServerI18next,
} from "next-i18next/server";
import { ClientProviders } from "@/components/layout/client-providers";
import NuqsProvider from "@/components/layout/nuqs-provider";

const inter = Inter({
  variable: "--font-sans-latin",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-sans-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dukkani Dashboard",
  description: "Dukkani Business Management Dashboard",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dukkani",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

initServerI18next(I18nextDashboardConfig);

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);

  return (
    <html
      lang={lng}
      dir={i18n.dir()}
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <NuqsProvider>
          <I18nProvider language={lng} resources={resources}>
            <ClientProviders>{children}</ClientProviders>
          </I18nProvider>
        </NuqsProvider>
      </body>
    </html>
  );
}
