import "@dukkani/ui/styles/globals.css";

import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { isStoreSelectorEnabled } from "@dukkani/env";
import { I18nextStorefrontConfig } from "@dukkani/i18n/storefront";
import { DirectionProvider } from "@dukkani/ui/components/direction";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { I18nProvider } from "next-i18next/client";
import {
  generateI18nStaticParams,
  getResources,
  getT,
  initServerI18next,
} from "next-i18next/server";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Providers } from "@/components/layout/providers";
import { StoreFooter } from "@/components/layout/store-footer";
import { StoreHeader } from "@/components/layout/store-header";
import { StoreSelector } from "@/components/layout/store-selector";
import { StoreSelectorBubble } from "@/components/layout/store-selector-bubble";
import { handleAPIError } from "@/shared/api/error-handler";
import { getQueryClient, orpc } from "@/shared/api/orpc";
import { appConstants } from "@/shared/config/constants";
import { getStoreSlug } from "@/shared/lib/store/slug-retrieval.util";

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
  title: "Dukkani Storefront",
  description: "Storefront powered by Dukkani",
};

initServerI18next(I18nextStorefrontConfig);

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

  const headersList = await headers();
  const host = headersList.get("host");
  const cookieStore = await cookies();
  const storeSlug = getStoreSlug(host, cookieStore);

  const queryClient = getQueryClient();
  let store: StorePublicOutput | null = null;

  if (storeSlug) {
    try {
      await queryClient.prefetchQuery(
        orpc.store.getBySlugPublic.queryOptions({
          input: { slug: storeSlug },
        }),
      );

      const storeData = queryClient.getQueryData(
        orpc.store.getBySlugPublic.queryKey({ input: { slug: storeSlug } }),
      );

      if (storeData) {
        store = storeData;
      }
    } catch (error) {
      handleAPIError(error);
    }
  }

  if (!store) {
    if (isStoreSelectorEnabled(process.env)) {
      return (
        <html
          lang={lng}
          dir={i18n.dir()}
          className={`${inter.variable} ${cairo.variable}`}
          suppressHydrationWarning
        >
          <body className="antialiased" suppressHydrationWarning>
            <I18nProvider language={lng} resources={resources}>
              <StoreSelector />
            </I18nProvider>
          </body>
        </html>
      );
    }
    return notFound();
  }

  return (
    <html
      lang={lng}
      dir={i18n.dir()}
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <NuqsAdapter>
          <I18nProvider language={lng} resources={resources}>
            <DirectionProvider dir={i18n.dir()}>
              <Providers storeSlug={store.slug}>
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <div className="min-h-screen overflow-x-hidden bg-background">
                    <StoreHeader store={store} />
                    <div style={{ height: appConstants.STORE_HEADER_HEIGHT }} />
                    <main>{children}</main>
                    <StoreFooter />
                  </div>
                </HydrationBoundary>
                {isStoreSelectorEnabled(process.env) && <StoreSelectorBubble />}
              </Providers>
            </DirectionProvider>
          </I18nProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
