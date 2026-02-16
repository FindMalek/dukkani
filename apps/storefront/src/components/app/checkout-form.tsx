"use client";

import type { PaymentMethodInfer } from "@dukkani/common/schemas/enums";
import { PaymentMethod } from "@dukkani/common/schemas/enums";
import { createOrderPublicInputSchema } from "@dukkani/common/schemas/order/input";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { AlertDescription, AlertTitle } from "@dukkani/ui/components/alert";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { PhoneInput } from "@dukkani/ui/components/phone-input";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { Textarea } from "@dukkani/ui/components/textarea";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
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

	const addressMap = useAddressMap();
	const createOrderMutation = useCreateOrder();
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
	const formattedTotal = total.toFixed(3);

	useEffect(() => {
		if (addressMap.error) {
			toast.error(t("delivery.locationErrorTitle"), {
				description: t("delivery.locationErrorDescription"),
			});
		}
	}, [addressMap.error, t]);

	useEffect(() => {
		if (createOrderMutation.isError) {
			toast.error(
				createOrderMutation.error instanceof Error
					? createOrderMutation.error.message
					: t("error"),
			);
		}
	}, [createOrderMutation.isError, createOrderMutation.error, t]);

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
			paymentMethod:
				(store.supportedPaymentMethods[0] as PaymentMethodInfer) ||
				PaymentMethod.COD,
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
			}));

			await createOrderMutation.mutateAsync({
				customerName: values.customerName,
				customerPhone: values.customerPhone,
				address: values.address,
				notes: combinedNotes,
				paymentMethod: values.paymentMethod,
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

	// Sync orderItems from cart to form (required for validation)
	useEffect(() => {
		if (enrichedData && enrichedData.length > 0) {
			const orderItems = enrichedData.map((item) => ({
				productId: item.productId,
				variantId: item.variantId ?? undefined,
				quantity: item.quantity,
			}));
			form.setFieldValue("orderItems", orderItems);
		}
	}, [enrichedData, form]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="contents"
		>
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="space-y-6">
					{/* Delivery Section */}
					<section>
						<div className="space-y-4">
							{/* Full Name */}
							<form.Field name="customerName">
								{(field) => {
									const isInvalid =
										field.state.meta.isBlurred && !field.state.meta.isValid;
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
										field.state.meta.isBlurred && !field.state.meta.isValid;
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
									<label
										htmlFor={field.name}
										className={cn(
											"relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-card-foreground text-sm transition-colors",
											"has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5",
											"cursor-pointer",
											field.state.value
												? "border-primary bg-primary/5 dark:bg-primary/10"
												: "border-input bg-card",
										)}
									>
										<Icons.whatsapp
											className={cn(
												field.state.value
													? "text-primary"
													: "text-muted-foreground",
											)}
										/>
										<div className="flex flex-1 items-start justify-between gap-3">
											<div className="space-y-0.5">
												<AlertTitle className="font-medium text-foreground text-sm">
													{t("delivery.whatsapp")}
												</AlertTitle>
												<AlertDescription className="text-muted-foreground text-xs">
													{t("delivery.whatsappDescription")}
												</AlertDescription>
											</div>
											<Checkbox
												id={field.name}
												checked={field.state.value ?? false}
												onCheckedChange={(checked) =>
													field.handleChange(checked === true)
												}
												disabled={createOrderMutation.isPending}
												className="shrink-0"
											/>
										</div>
									</label>
								)}
							</form.Field>

							{/* Street Address */}
							<form.Field name="address.street">
								{(field) => {
									const isInvalid =
										field.state.meta.isBlurred && !field.state.meta.isValid;
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
											field.state.meta.isBlurred && !field.state.meta.isValid;
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
											field.state.meta.isBlurred && !field.state.meta.isValid;
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

							{/* Use my location – auto-fill address */}
							<div className="space-y-2">
								<Button
									type="button"
									variant="outline"
									className="w-full"
									disabled={createOrderMutation.isPending}
									isLoading={addressMap.loading}
									onClick={() => addressMap.getCurrentLocation()}
								>
									{t("delivery.useLocation")}
								</Button>
								<p className="text-muted-foreground text-sm">
									{t("delivery.useLocationDescription")}
								</p>
							</div>
						</div>
					</section>

					{/* Payment Section */}
					<section>
						<h2 className="mb-4 font-semibold text-lg">{t("payment.title")}</h2>
						<form.Field name="paymentMethod">
							{(field) => {
								const paymentMethod =
									(field.state.value as PaymentMethodInfer) ||
									PaymentMethod.COD;
								return (
									<RadioGroup
										name={field.name}
										value={paymentMethod}
										onValueChange={(value) =>
											field.handleChange(value as PaymentMethodInfer)
										}
										disabled={createOrderMutation.isPending}
									>
										<div className="space-y-3">
											{store.supportedPaymentMethods.includes(
												PaymentMethod.COD,
											) && (
												<div
													className={cn(
														"flex items-center gap-3 rounded-md border p-4",
														paymentMethod === PaymentMethod.COD
															? "border-primary bg-primary/5"
															: "border-input",
													)}
												>
													<RadioGroupItem value={PaymentMethod.COD} id="cod" />
													<label
														htmlFor="cod"
														className="flex-1 cursor-pointer font-medium"
													>
														{t("payment.cod")}
													</label>
												</div>
											)}
											{store.supportedPaymentMethods.includes(
												PaymentMethod.CARD,
											) ? (
												<div
													className={cn(
														"flex items-center gap-3 rounded-md border p-4",
														paymentMethod === PaymentMethod.CARD
															? "border-primary bg-primary/5"
															: "border-input",
													)}
												>
													<RadioGroupItem
														value={PaymentMethod.CARD}
														id="card"
													/>
													<label
														htmlFor="card"
														className="flex-1 cursor-pointer font-medium"
													>
														{t("payment.creditCard")}
													</label>
												</div>
											) : (
												<div className="flex items-center gap-3 rounded-md border border-input p-4 opacity-50">
													<RadioGroupItem
														value={PaymentMethod.CARD}
														id="card"
														disabled
													/>
													<label
														htmlFor="card"
														className="flex-1 cursor-not-allowed font-medium"
													>
														{t("payment.creditCard")} ({t("payment.comingSoon")}
														)
													</label>
												</div>
											)}
										</div>
									</RadioGroup>
								);
							}}
						</form.Field>
					</section>

					{/* Delivery Instructions */}
					<section>
						<form.Field name="notes">
							{(field) => {
								const isInvalid =
									field.state.meta.isBlurred && !field.state.meta.isValid;
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

				{/* Order summary - below form */}
				<section className="mt-8 border-t pt-6">
					<OrderSummary
						items={enrichedData ?? []}
						shippingCost={store.shippingCost}
						loading={enrichedCartItems.isLoading || !enrichedData}
					/>
				</section>

				{/* Sticky footer - total + Place order */}
				<div className="fixed right-0 bottom-0 left-0 z-10 border-t bg-background px-4 py-3">
					<div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
						<Button
							type="submit"
							className="w-full bg-primary text-primary-foreground"
							size="lg"
							disabled={
								createOrderMutation.isPending ||
								!enrichedData ||
								enrichedData.length === 0
							}
							isLoading={createOrderMutation.isPending}
						>
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-2">
									<Icons.shoppingCart className="size-4" />
									<span>{t("placeOrder")}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-semibold text-sm">
										{formattedTotal} TND
									</span>
									<Icons.arrowRight className="size-4" />
								</div>
							</div>
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}
