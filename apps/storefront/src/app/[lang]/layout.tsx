import "@dukkani/ui/styles/globals.css";

import { LOCALES, type Locale } from "@dukkani/common/schemas/constants";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Providers } from "@/components/layout/providers";
import { StoreFooter } from "@/components/layout/store-footer";
import { StoreHeader } from "@/components/layout/store-header";
import { handleAPIError } from "@/lib/error";
import { getQueryClient, orpc } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
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
		<html lang={lang} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<Providers locale={lang} messages={messages} storeSlug={store.slug}>
					<HydrationBoundary state={dehydrate(queryClient)}>
						<div className="min-h-screen overflow-x-hidden bg-background">
							<StoreHeader storeName={store.name} />
							<div className="h-[49px]" />
							<main>{children}</main>
							<StoreFooter />
						</div>
					</HydrationBoundary>
				</Providers>
			</body>
		</html>
	);
}
