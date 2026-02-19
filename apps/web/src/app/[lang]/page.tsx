import { CTA } from "@/components/app/cta";
import { FAQ } from "@/components/app/faq";
import { Features } from "@/components/app/features";
import { Hero } from "@/components/app/hero";
import { Pricing } from "@/components/app/pricing";

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
