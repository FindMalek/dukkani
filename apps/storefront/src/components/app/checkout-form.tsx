"use client";

import type { PaymentMethodInfer } from "@dukkani/common/schemas/enums";
import { createOrderPublicInputSchema } from "@dukkani/common/schemas/order/input";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Input } from "@dukkani/ui/components/input";
import { PhoneInput } from "@dukkani/ui/components/phone-input";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { Textarea } from "@dukkani/ui/components/textarea";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useAddressMap } from "@/hooks/use-address-map";
import { useCreateOrder } from "@/hooks/use-create-order";
import { orpc } from "@/lib/orpc";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";
import { OrderSummary } from "./order-summary";

interface CheckoutFormProps {
	store: StorePublicOutput;
}

export function CheckoutForm({ store }: CheckoutFormProps) {
	const router = useRouter();
	const t = useTranslations("storefront.store.checkout");

	const [paymentMethod, setPaymentMethod] = useState<PaymentMethodInfer>(
		store.supportedPaymentMethods[0],
	);
	const createOrderMutation = useCreateOrder();
	const addressMap = useAddressMap();

	const carts = useCartStore((state) => state.carts);
	const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

	const cartItems = useMemo(() => {
		if (!currentStoreSlug) return [];
		return carts[currentStoreSlug] || [];
	}, [carts, currentStoreSlug]);

	// Redirect if cart is empty
	useEffect(() => {
		if (cartItems.length === 0) {
			router.push(RoutePaths.HOME.url);
		}
	}, [cartItems.length, router]);

	const queryInput = useMemo(() => {
		return {
			items: cartItems.map((item) => ({
				productId: item.productId,
				variantId: item.variantId,
				quantity: item.quantity,
			})),
		};
	}, [cartItems]);

	const enrichedCartItems = useQuery({
		...orpc.cart.getCartItems.queryOptions({
			input: queryInput,
		}),
		enabled: cartItems.length > 0,
		staleTime: 30 * 1000,
	});

	const enrichedData = useMemo(() => {
		if (!enrichedCartItems.data) return undefined;
		if (cartItems.length === 0) return [];

		const filteredData = enrichedCartItems.data.filter((enrichedItem) => {
			return cartItems.some(
				(item) =>
					item.productId === enrichedItem.productId &&
					item.variantId === enrichedItem.variantId,
			);
		});

		return filteredData.map((enrichedItem) => {
			const currentItem = cartItems.find(
				(item) =>
					item.productId === enrichedItem.productId &&
					item.variantId === enrichedItem.variantId,
			);
			return {
				...enrichedItem,
				quantity: currentItem?.quantity ?? enrichedItem.quantity,
			};
		});
	}, [enrichedCartItems.data, cartItems]);

	const subtotal =
		enrichedData?.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0) ?? 0;
	const total = subtotal + store.shippingCost;

	const form = useSchemaForm({
		schema: createOrderPublicInputSchema,
		defaultValues: {
			customerName: "",
			customerPhone: "",
			address: {
				street: "",
				city: "",
				postalCode: "",
			},
			notes: "",
			paymentMethod,
			storeId: store.id,
			orderItems: [],
			isWhatsApp: false,
		},
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values) => {
			// Notes field - WhatsApp preference is now stored separately in isWhatsApp
			const combinedNotes = values.notes || undefined;

			// Build order items from cart
			if (!enrichedData || enrichedData.length === 0) {
				return;
			}

			const orderItems = enrichedData.map((item) => ({
				productId: item.productId,
				variantId: item.variantId,
				quantity: item.quantity,
				price: item.price,
			}));

			await createOrderMutation.mutateAsync({
				customerName: values.customerName,
				customerPhone: values.customerPhone,
				address: values.address,
				notes: combinedNotes,
				paymentMethod,
				isWhatsApp: values.isWhatsApp,
				storeId: store.id,
				orderItems,
			});
		},
	});

	// Update form when address is selected from map
	useEffect(() => {
		if (addressMap.city) {
			form.setFieldValue("address.city", addressMap.city);
		}
		if (addressMap.street) {
			form.setFieldValue("address.street", addressMap.street);
		}
		if (addressMap.postalCode) {
			form.setFieldValue("address.postalCode", addressMap.postalCode);
		}
		if (addressMap.latitude && addressMap.longitude) {
			form.setFieldValue("address.latitude", addressMap.latitude);
			form.setFieldValue("address.longitude", addressMap.longitude);
		}
	}, [
		addressMap.city,
		addressMap.street,
		addressMap.postalCode,
		addressMap.latitude,
		addressMap.longitude,
		form,
	]);

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8 pb-24">
			<div className="space-y-6">
				{/* Delivery Section */}
				<section>
					<div className="space-y-4">
						{/* Full Name */}
						<form.Field name="customerName">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											{t("delivery.fullName")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											disabled={createOrderMutation.isPending}
											aria-invalid={isInvalid}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						{/* Phone */}
						<form.Field name="customerPhone">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											{t("delivery.phone")}
										</FieldLabel>
										<PhoneInput
											defaultCountry="TN"
											value={field.state.value ?? ""}
											onChange={field.handleChange}
											onBlur={field.handleBlur}
											disabled={createOrderMutation.isPending}
											aria-invalid={isInvalid}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						{/* WhatsApp Checkbox */}
						<form.Field name="isWhatsApp" defaultValue={false}>
							{(field) => (
								<div className="flex items-center gap-2">
									<Checkbox
										id={field.name}
										checked={field.state.value ?? false}
										onCheckedChange={(checked) =>
											field.handleChange(checked === true)
										}
										disabled={createOrderMutation.isPending}
									/>
									<label
										htmlFor={field.name}
										className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{t("delivery.whatsapp")}
									</label>
								</div>
							)}
						</form.Field>

						{/* Street Address */}
						<form.Field name="address.street">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											{t("delivery.streetAddress")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											disabled={createOrderMutation.isPending}
											aria-invalid={isInvalid}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						{/* City & Postal Code - side by side */}
						<div className="grid grid-cols-2 gap-4">
							<form.Field name="address.city">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												{t("delivery.city")}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value ?? ""}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												disabled={createOrderMutation.isPending}
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name="address.postalCode">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												{t("delivery.postalCode")}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value ?? ""}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												disabled={createOrderMutation.isPending}
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
						</div>

						{/* Map Location Selector */}
						{/* TODO: Install mapcn: npx shadcn@latest add https://mapcn.dev/maps/map.json */}
						{/* Then add Map component here for address selection */}
						{addressMap.error && (
							<div className="text-destructive text-sm">{addressMap.error}</div>
						)}
					</div>
				</section>

				{/* Payment Section */}
				<section>
					<h2 className="mb-4 font-semibold text-lg">{t("payment.title")}</h2>
					<RadioGroup
						value={paymentMethod}
						onValueChange={(value) =>
							setPaymentMethod(value as PaymentMethodInfer)
						}
						disabled={createOrderMutation.isPending}
					>
						<div className="space-y-3">
							{store.supportedPaymentMethods.includes("COD") && (
								<div
									className={`flex items-center gap-3 rounded-md border p-4 ${
										paymentMethod === "COD"
											? "border-primary bg-primary/5"
											: "border-input"
									}`}
								>
									<RadioGroupItem value="COD" id="cod" />
									<label
										htmlFor="cod"
										className="flex-1 cursor-pointer font-medium"
									>
										{t("payment.cod")}
									</label>
								</div>
							)}
							{store.supportedPaymentMethods.includes("CARD") ? (
								<div
									className={`flex items-center gap-3 rounded-md border p-4 ${
										paymentMethod === "CARD"
											? "border-primary bg-primary/5"
											: "border-input"
									}`}
								>
									<RadioGroupItem value="CARD" id="card" />
									<label
										htmlFor="card"
										className="flex-1 cursor-pointer font-medium"
									>
										{t("payment.creditCard")}
									</label>
								</div>
							) : (
								<div className="flex items-center gap-3 rounded-md border border-input p-4 opacity-50">
									<RadioGroupItem value="CARD" id="card" disabled />
									<label
										htmlFor="card"
										className="flex-1 cursor-not-allowed font-medium"
									>
										{t("payment.creditCard")} ({t("payment.comingSoon")})
									</label>
								</div>
							)}
						</div>
					</RadioGroup>
				</section>

				{/* Delivery Instructions */}
				<section>
					<form.Field name="notes">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										{t("delivery.instructions")}
									</FieldLabel>
									<Textarea
										id={field.name}
										name={field.name}
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										disabled={createOrderMutation.isPending}
										aria-invalid={isInvalid}
										rows={3}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</section>
			</div>

			{/* Order summary - below form */}
			<section className="mt-8 border-t pt-6">
				{enrichedCartItems.isLoading || !enrichedData ? (
					<div className="space-y-3">
						<Skeleton className="h-5 w-32" />
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className="flex justify-between py-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-16" />
							</div>
						))}
						<Skeleton className="h-px w-full" />
						<div className="space-y-2 pt-3">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-5 w-24" />
						</div>
					</div>
				) : (
					<OrderSummary
						items={enrichedData}
						shippingCost={store.shippingCost}
					/>
				)}
			</section>

			{/* Sticky footer - total + Place order */}
			<div className="fixed right-0 bottom-0 left-0 z-10 border-t bg-background px-4 py-3">
				<div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
					<Button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						disabled={
							createOrderMutation.isPending ||
							!enrichedData ||
							enrichedData.length === 0
						}
						isLoading={createOrderMutation.isPending}
						className="w-full"
						size="lg"
					>
						{t("placeOrder")} {total.toFixed(3)} TND
					</Button>
				</div>
				{createOrderMutation.isError && (
					<div className="mt-2 rounded-md border border-destructive bg-destructive/10 p-2 text-destructive text-sm">
						{createOrderMutation.error instanceof Error
							? createOrderMutation.error.message
							: t("error")}
					</div>
				)}
			</div>
		</div>
	);
}
