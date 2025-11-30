"use client";

import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export default async function Home({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	return (
		<>
			<Hero />
			<Features />
			<Pricing />
			<FAQ />
			<CTA />
		</>
	);
}
