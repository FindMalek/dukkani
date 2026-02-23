import { AutomatedConfirmation } from "@/components/app/automated-confirmation";
import { CTA } from "@/components/app/cta";
import { FAQ } from "@/components/app/faq";
import { Features } from "@/components/app/features";
import { Hero } from "@/components/app/hero";
import { PainPoints } from "@/components/app/pain-points";
import { Pricing } from "@/components/app/pricing";
import { Process } from "@/components/app/process";

export default function Home() {
	return (
		<>
			<Hero />
			<PainPoints />
			<Process />
			<AutomatedConfirmation />
			<Features />
			<Pricing />
			<FAQ />
			<CTA />
		</>
	);
}
