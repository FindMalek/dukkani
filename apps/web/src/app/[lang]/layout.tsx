import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@dukkani/ui/styles/globals.css";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

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
	return [{ lang: "en" }, { lang: "fr" }];
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: Locale }>;
}>) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<html lang={lang} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
