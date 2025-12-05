"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@dukkani/ui/components/accordion";

interface LoginAccordionProps {
	children: React.ReactNode;
}

export function LoginAccordion({ children }: LoginAccordionProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="more-options" className="border-none">
				<AccordionTrigger className="py-2 text-muted-foreground text-sm hover:no-underline">
					Show other options
				</AccordionTrigger>
				<AccordionContent className="space-y-3 pt-4">
					{children}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
