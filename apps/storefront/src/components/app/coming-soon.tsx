"use client";

import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ComingSoonProps {
	store: StorePublicOutput;
}

export function ComingSoon({ store }: ComingSoonProps) {
	const t = useTranslations("storefront.comingSoon");
	const [emailOrPhone, setEmailOrPhone] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			// TODO: Call API endpoint to subscribe
			// await client.store.subscribeToLaunch({ storeId: store.id, contact: emailOrPhone });

			setIsSuccess(true);
			setEmailOrPhone("");
		} catch (err) {
			setError(t("error"));
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="mx-auto max-w-md">
				{/* Store Name Box */}
				<div className="mb-8 rounded-lg border bg-card p-4 text-center">
					<h1 className="font-bold text-xl">{store.name}</h1>
				</div>

				{/* Main Heading */}
				<h2 className="mb-4 text-center font-bold text-3xl">{t("heading")}</h2>

				{/* Description */}
				<p className="mb-2 text-center text-muted-foreground">
					{t("description.line1")}
				</p>
				<p className="mb-8 text-center text-muted-foreground">
					{t("description.line2")}
				</p>

				{/* Form */}
				{isSuccess ? (
					<div className="rounded-lg border bg-muted/30 p-6 text-center">
						<p className="text-muted-foreground">{t("success")}</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							type="text"
							placeholder={t("input.placeholder")}
							value={emailOrPhone}
							onChange={(e) => setEmailOrPhone(e.target.value)}
							required
							disabled={isSubmitting}
							className="w-full"
						/>

						<Button
							type="submit"
							disabled={isSubmitting || !emailOrPhone.trim()}
							className="w-full"
						>
							{isSubmitting ? (
								<>
									<Icons.spinner className="mr-2 size-4 animate-spin" />
									{t("button.submitting")}
								</>
							) : (
								t("button.label")
							)}
						</Button>

						{error && (
							<p className="text-center text-destructive text-sm">{error}</p>
						)}
					</form>
				)}

				{/* Privacy Note */}
				<div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
					<Icons.lock className="size-4" />
					<span>{t("privacy")}</span>
				</div>
			</div>
		</div>
	);
}
