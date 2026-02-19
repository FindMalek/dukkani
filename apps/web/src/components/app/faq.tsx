"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@dukkani/ui/components/accordion";

const faqs = [
	{
		question: "How does Dukkani work with WhatsApp?",
		answer:
			"Dukkani creates a beautiful online store for your products. When a customer places an order, we automatically format the order details and send them directly to your WhatsApp number, allowing you to chat with the customer instantly.",
	},
	{
		question: "Do I need to pay to start?",
		answer:
			"No! Our Starter plan is completely free forever. It includes up to 20 products and unlimited orders. You only upgrade when you need more advanced features like custom domains or unlimited products.",
	},
	{
		question: "Can I use my own domain name?",
		answer:
			"Yes, the Pro and Business plans allow you to connect your own custom domain (e.g., yourstore.com) to your Dukkani store, giving your business a professional look.",
	},
	{
		question: "Is payment processing secure?",
		answer:
			"Absolutely. We integrate with trusted global payment providers to ensure all transactions are encrypted and secure. We never store sensitive card data on our servers.",
	},
];

export function FAQ() {
	return (
		<section id="faq" className="py-24">
			<div className="container mx-auto max-w-3xl px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-muted-foreground">
						Everything you need to know about Dukkani.
					</p>
				</div>
				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className="text-left text-lg">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-base text-muted-foreground">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
