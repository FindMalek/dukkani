import "@dukkani/ui/styles/globals.css";

import {
	getTextDirection,
	LOCALES,
	type Locale,
} from "@dukkani/common/schemas/constants";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { getMessages } from "next-intl/server";
import Providers from "@/components/layout/providers";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
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
	const messages = await getMessages();

	return (
		<html lang={lang} dir={getTextDirection(lang)} suppressHydrationWarning>
			<body
				className={`${inter.variable} antialiased`}
				suppressHydrationWarning
			>
				<Providers locale={lang} messages={messages}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
