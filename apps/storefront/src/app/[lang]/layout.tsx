import "@dukkani/ui/styles/globals.css";

import {
	getTextDirection,
	LOCALES,
	type Locale,
} from "@dukkani/common/schemas/constants";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Providers } from "@/components/layout/providers";
import { StoreFooter } from "@/components/layout/store-footer";
import { StoreHeader } from "@/components/layout/store-header";
import { STORE_HEADER_HEIGHT_PX } from "@/lib/constants";
import { handleAPIError } from "@/lib/error";
import { getQueryClient, orpc } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dukkani Storefront",
	description: "Storefront powered by Dukkani",
};

export async function generateStaticParams() {
	return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = (await params) as { lang: Locale };
	setRequestLocale(lang);
	const messages = await getMessages();

	const headersList = await headers();
	const host = headersList.get("host");
	const storeSlug = getStoreSlugFromHost(host);

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
		return notFound();
	}

	return (
		<html lang={lang} dir={getTextDirection(lang)} suppressHydrationWarning>
			<body
				className={`${inter.variable} antialiased`}
				suppressHydrationWarning
			>
				<Providers locale={lang} messages={messages} storeSlug={store.slug}>
					<HydrationBoundary state={dehydrate(queryClient)}>
						<div className="min-h-screen overflow-x-hidden bg-background">
							<StoreHeader store={store} />
							<div style={{ height: `${STORE_HEADER_HEIGHT_PX}px` }} />
							<main>{children}</main>
							<StoreFooter />
						</div>
					</HydrationBoundary>
				</Providers>
			</body>
		</html>
	);
}
