import "@dukkani/ui/styles/globals.css";

import { I18nextWebConfig } from "@dukkani/i18n/web";
import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { I18nProvider } from "next-i18next/client";
import {
  generateI18nStaticParams,
  getResources,
  getT,
  initServerI18next,
} from "next-i18next/server";
import { ClientProviders } from "@/components/layout/client-providers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

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
  title: "Dukkani - Business Management Solution",
  description: "Your all-in-one business management solution",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "Dukkani",
  },
};

initServerI18next(I18nextWebConfig);

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
      <body className="antialiased">
        <I18nProvider language={lng} resources={resources}>
          <ClientProviders>
            <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </ClientProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
