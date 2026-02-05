"use client";

import type { PaymentMethodInfer } from "@dukkani/common/schemas/enums";
import { createOrderPublicInputSchema } from "@dukkani/common/schemas/order/input";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { PhoneInput } from "@dukkani/ui/components/phone-input";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { Spinner } from "@dukkani/ui/components/spinner";
import { Textarea } from "@dukkani/ui/components/textarea";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useAddressMap } from "@/hooks/use-address-map";
import { useCreateOrder } from "@/hooks/use-create-order";
import { getItemKey } from "@/lib/cart-utils";
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

	const itemKeysString = useMemo(() => {
		return cartItems.map(getItemKey).sort().join(",");
	}, [cartItems]);

	const queryInput = useMemo(() => {
		return {
			items: cartItems.map((item) => ({
				productId: item.productId,
				variantId: item.variantId,
				quantity: item.quantity,
			})),
		};
	}, [itemKeysString]);

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
		<div className="container mx-auto max-w-4xl px-4 py-8">
			{/* Header */}
			<div className="mb-6 flex items-center gap-4">
				<button
					type="button"
					onClick={() => window.history.back()}
					className="flex items-center justify-center"
				>
					<Icons.arrowLeft className="size-5" />
				</button>
				<h1 className="font-bold text-2xl">{t("title")}</h1>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				{/* Left Column - Form */}
				<div className="space-y-6">
					{/* Delivery Section */}
					<section>
						<div className="mb-4 flex items-center justify-between">
							<h2 className="font-semibold text-lg">{t("delivery.title")}</h2>
							<span className="text-muted-foreground text-sm">
								{t("delivery.fastDelivery")}
							</span>
						</div>

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

							{/* City */}
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

							{/* Postal Code */}
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

							{/* Map Location Selector */}
							{/* TODO: Install mapcn: npx shadcn@latest add https://mapcn.dev/maps/map.json */}
							{/* Then add Map component here for address selection */}
							{addressMap.error && (
								<div className="text-destructive text-sm">
									{addressMap.error}
								</div>
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
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>
					</section>
				</div>

				{/* Right Column - Order Summary */}
				<div>
					{enrichedData && enrichedData.length > 0 ? (
						<OrderSummary
							items={enrichedData}
							shippingCost={store.shippingCost}
						/>
					) : (
						<div className="flex items-center justify-center py-8">
							<Spinner className="size-6 animate-spin text-muted-foreground" />
						</div>
					)}
				</div>
			</div>

			{/* Submit Button */}
			<div className="mt-8">
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
					className="w-full bg-primary text-primary-foreground"
					size="lg"
				>
					{createOrderMutation.isPending ? (
						<>
							<Spinner className="mr-2 size-4 animate-spin" />
							{t("submitting")}
						</>
					) : (
						<>
							{t("placeOrder")} {total.toFixed(3)} TND
						</>
					)}
				</Button>

				{createOrderMutation.isError && (
					<div className="mt-4 rounded-md border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
						{createOrderMutation.error instanceof Error
							? createOrderMutation.error.message
							: t("error")}
					</div>
				)}
			</div>
		</div>
	);
}
