"use client";

import { OrderEntity } from "@dukkani/common/entities/order/entity";
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
      <OrderDetailErrorState
        title={t("title")}
        errorMessage={t("notFound")}
      />
    );
  }

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
          "container mx-auto max-w-2xl space-y-2 p-3",
          showFooter ? "pb-24" : "pb-3",
        )}
      >
        <OrderDetailHeader title={t("title")} titleClassName="text-base" />

        <OrderDetailSummary
          badgeVariant={badgeVariant}
          orderId={order.id}
          orderMetaLine={formattedDate}
          statusLabel={tList(statusKey)}
          totalFormatted={formatPrice(total)}
        />

        <OrderDetailMetaCards
          columnLabels={{ items: t("items"), payment: t("payment") }}
          itemsLine={t("itemsCount", { count: itemsCount })}
          paymentLabel={tList(paymentKey)}
        />

        {order.customer && (
          <OrderDetailCustomerCard
            name={order.customer.name}
            phone={phone}
            callAriaLabel={callActionLabel}
            openWhatsAppAriaLabel={t("openWhatsApp")}
            contactHref={contactHref}
            isWaLink={isWaLink}
            isWhatsApp={isWhatsApp}
            sectionLabel={t("customer")}
          />
        )}

        {order.address && (
          <OrderDetailDeliveryCard
            city={order.address.city}
            labels={{ deliveryAddress: t("deliveryAddress") }}
            notes={order.notes}
            postalCode={order.address.postalCode}
            street={order.address.street}
          />
        )}

        <OrderDetailItemsCard
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
