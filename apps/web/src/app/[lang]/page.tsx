import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";

export default function Home() {
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
