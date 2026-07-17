"use client";

import { OrderEntity } from "@dukkani/common/entities/order/entity";
import { Badge } from "@dukkani/ui/components/badge";
import { cn } from "@dukkani/ui/lib/utils";
import { notFound, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { OrderDetailCustomerCard } from "@/components/app/orders/order-detail-customer-card";
import { OrderDetailDeliveryCard } from "@/components/app/orders/order-detail-delivery-card";
import { OrderDetailErrorState } from "@/components/app/orders/order-detail-error-state";
import { OrderDetailFooter } from "@/components/app/orders/order-detail-footer";
import { OrderDetailHeader } from "@/components/app/orders/order-detail-header";
import { OrderDetailItemsCard } from "@/components/app/orders/order-detail-items-card";
import { OrderDetailMetaCards } from "@/components/app/orders/order-detail-meta-cards";
import { OrderDetailSkeleton } from "@/components/app/orders/order-detail-skeleton";
import { OrderDetailSummary } from "@/components/app/orders/order-detail-summary";
import { useOrderDetailPage } from "@/shared/lib/order/controller.hook";
import { getOrderDetailView } from "@/shared/lib/order/order.util";
import { getContactHref } from "@/shared/lib/phone/contact-href.util";
import { getDynamicRouteParam } from "@/shared/lib/route-params.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

export default function OrderDetailPage() {
  const params = useParams();
  const t = useTranslations("orders.detail");
  const tList = useTranslations("orders.list");
  const orderId = getDynamicRouteParam(params, "id");
  const formatPrice = useFormatPriceForActiveStore();
  const {
    order,
    isLoading,
    isError,
    isNotFoundError,
    updateStatusMutation,
    formattedCreatedAt: formattedDate,
  } = useOrderDetailPage(orderId);

  if (!orderId) {
    notFound();
  }

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError) {
    return (
      <OrderDetailErrorState
        title={t("title")}
        errorMessage={isNotFoundError ? t("notFound") : t("errorLoading")}
      />
    );
  }

  if (!order) {
    return (
      <OrderDetailErrorState title={t("title")} errorMessage={t("notFound")} />
    );
  }

  const {
    subtotal,
    total,
    deliveryFee,
    itemsCount,
    nextStatus,
    canAdvance,
    badgeVariant,
    statusKey,
    paymentKey,
    phone,
    isWhatsApp,
    customerName,
  } = getOrderDetailView(order);

  const contactHref = phone ? getContactHref(phone, isWhatsApp) : null;
  const isWaLink = contactHref != null && contactHref.startsWith("https://");
  const nextStatusLabel =
    canAdvance && nextStatus
      ? tList(OrderEntity.getStatusLabelKey(nextStatus))
      : null;
  const slideToConfirmText = nextStatusLabel
    ? t("slideToSetStatus", { status: nextStatusLabel })
    : null;

  const hasContact = phone != null && contactHref != null;
  const showFooter = canAdvance || hasContact;
  const callActionLabel = customerName
    ? t("callCustomer", { name: customerName })
    : t("call");
  const contactCompactAriaLabel = isWhatsApp
    ? t("openWhatsApp")
    : callActionLabel;
  const contactOnlyLabel = isWhatsApp ? t("openWhatsApp") : callActionLabel;

  return (
    <>
      <div
        className={cn(
          "container mx-auto max-w-2xl p-3 xl:max-w-6xl",
          showFooter ? "pb-24" : "pb-3",
        )}
      >
        <OrderDetailHeader
          title={t("title")}
          titleClassName="text-base"
          endSlot={
            <Badge className="hidden xl:inline-flex" variant={badgeVariant}>
              {tList(statusKey)}
            </Badge>
          }
        />

        <div
          className={cn(
            "mt-2 space-y-2",
            "xl:grid xl:grid-flow-row-dense xl:grid-cols-3 xl:items-start xl:gap-4 xl:space-y-0",
          )}
        >
          <OrderDetailSummary
            badgeVariant={badgeVariant}
            className="xl:order-1 xl:col-span-2"
            orderId={order.id}
            orderMetaLine={formattedDate}
            statusLabel={tList(statusKey)}
            totalFormatted={formatPrice(total)}
          />

          <OrderDetailMetaCards
            className="xl:order-4 xl:col-span-1 xl:col-start-3"
            columnLabels={{ items: t("items"), payment: t("payment") }}
            itemsLine={t("itemsCount", { count: itemsCount })}
            paymentLabel={tList(paymentKey)}
          />

          {order.customer && (
            <OrderDetailCustomerCard
              callAriaLabel={callActionLabel}
              className="xl:order-2 xl:col-span-1 xl:col-start-3"
              contactHref={contactHref}
              isWaLink={isWaLink}
              isWhatsApp={isWhatsApp}
              name={order.customer.name}
              openWhatsAppAriaLabel={t("openWhatsApp")}
              phone={phone}
              sectionLabel={t("customer")}
            />
          )}

          {order.address && (
            <OrderDetailDeliveryCard
              city={order.address.city}
              className="xl:order-3 xl:col-span-1 xl:col-start-3"
              labels={{ deliveryAddress: t("deliveryAddress") }}
              notes={order.notes}
              postalCode={order.address.postalCode}
              street={order.address.street}
            />
          )}

          <OrderDetailItemsCard
            className="xl:order-5 xl:col-span-2 xl:col-start-1 xl:row-span-2"
            deliveryFee={deliveryFee}
            formatPrice={formatPrice}
            itemCountLine={(n) => t("itemsCount", { count: n })}
            labels={{
              delivery: t("delivery"),
              orderItems: t("orderItems"),
              subtotal: t("subtotal"),
              total: t("total"),
            }}
            orderItems={order.orderItems}
            subtotal={subtotal}
            total={total}
          />
        </div>
      </div>

      {showFooter && (
        <OrderDetailFooter
          canAdvance={canAdvance}
          contactCompactAriaLabel={contactCompactAriaLabel}
          contactHref={contactHref}
          contactOnlyLabel={contactOnlyLabel}
          isMutating={updateStatusMutation.isPending}
          isWaLink={isWaLink}
          isWhatsApp={isWhatsApp}
          onConfirmAdvance={() => {
            if (nextStatus) {
              updateStatusMutation.mutate({ id: order.id, status: nextStatus });
            }
          }}
          phone={phone}
          slideToConfirmText={slideToConfirmText}
        />
      )}
    </>
  );
}
