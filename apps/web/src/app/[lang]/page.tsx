"use client";

import { useTranslations } from "next-intl";
import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";

export default async function Home() {
	const t = useTranslations("common");

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
