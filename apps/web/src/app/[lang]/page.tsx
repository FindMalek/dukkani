import { AutomatedConfirmation } from "@/components/app/automated-confirmation";
import { CostCalculator } from "@/components/app/cost-calculator";
import { Features } from "@/components/app/features";
import { Hero } from "@/components/app/hero";
import { PainPoints } from "@/components/app/pain-points";
import { Process } from "@/components/app/process";

export default function Home() {
	return (
		<>
			<Hero />
			<PainPoints />
			<Process />
			<AutomatedConfirmation />
			<Features />
			<CostCalculator />
		</>
	);
}
