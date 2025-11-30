import "@dukkani/ui/styles/globals.css";

import { LOCALES, type Locale } from "@dukkani/common/schemas/constants";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
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
		<html lang={lang} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers locale={lang} messages={messages}>
					<div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
