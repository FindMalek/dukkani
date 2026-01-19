"use client";

import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";

import { env } from "@/env";

export default function Home() {
	console.log(env.NEXT_PUBLIC_CORS_ORIGIN);
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
