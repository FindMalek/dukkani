import "@dukkani/ui/styles/globals.css";

import { LOCALES, type Locale } from "@dukkani/common/schemas/constants";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Providers } from "@/components/layout/providers";

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

	return (
		<html lang={lang} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers locale={lang} messages={messages}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
