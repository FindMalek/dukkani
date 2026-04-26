"use client";

import {
  ORDER_STATUS_BADGE_VARIANT,
  OrderEntity,
} from "@dukkani/common/entities/order/entity";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Separator } from "@dukkani/ui/components/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { OrderDetailSkeleton } from "@/components/app/orders/order-detail-skeleton";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";
import { getItemsCount, getOrderTotal } from "@/shared/lib/order/order.util";
import { getDynamicRouteParam } from "@/shared/lib/route-params.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = getDynamicRouteParam(params, "id");

  const t = useTranslations("orders.detail");
  const tList = useTranslations("orders.list");
  const format = useFormatter();
  const formatPrice = useFormatPriceForActiveStore();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    ...appQueries.order.byId({ input: { id: orderId ?? "" } }),
    enabled: !!orderId,
  });
  const updateStatusMutation = useMutation(appMutations.order.updateStatus());

  if (!orderId) {
    notFound();
  }

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto max-w-2xl p-4">
        <div className="mb-6 flex items-center gap-2">
          <Link href={RoutePaths.ORDERS.INDEX.url}>
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="font-semibold">{t("title")}</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive text-sm">{t("errorLoading")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subtotal = getOrderTotal(order);
  const deliveryFee = order.store?.shippingCost ?? 0;
  const total = subtotal + deliveryFee;
  const itemsCount = getItemsCount(order);
  const nextStatus = OrderEntity.getNextStatus(order.status);
  const canAdvance = nextStatus !== null;
  const badgeVariant = ORDER_STATUS_BADGE_VARIANT[order.status] ?? "outline";
  const statusKey = OrderEntity.getStatusLabelKey(order.status);
  const paymentKey = OrderEntity.getPaymentMethodLabelKey(order.paymentMethod);

  const phone = order.customer?.phone;
  const isWhatsApp = order.customer?.prefersWhatsApp ?? false;
  const firstName = order.customer?.name?.split(" ")[0] ?? t("call");

  const now = new Date();
  const orderDate = new Date(order.createdAt);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isToday = orderDate.toDateString() === now.toDateString();
  const isYesterday = orderDate.toDateString() === yesterday.toDateString();
  const formattedTime = format.dateTime(orderDate, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = isToday
    ? `${tList("today")}, ${formattedTime}`
    : isYesterday
      ? `${tList("yesterday")}, ${formattedTime}`
      : format.dateTime(orderDate, { dateStyle: "medium", timeStyle: "short" });

  return (
    <>
      <div className="container mx-auto max-w-2xl space-y-2 p-3 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href={RoutePaths.ORDERS.INDEX.url}>
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="font-semibold text-base">{t("title")}</h1>
          <div className="w-9" />
        </div>

        {/* Status + Price + ID/Date */}
        <div className="flex flex-col items-center gap-1">
          <Badge variant={badgeVariant}>{tList(statusKey)}</Badge>
          <p className="font-bold text-4xl tracking-tight">
            {formatPrice(total)}
          </p>
          <p className="text-muted-foreground text-xs">
            #{order.id} · {formattedDate}
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-2">
          <Card>
            <div className="flex items-center gap-2.5 p-2.5">
              <Icons.shoppingCart className="size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">{t("payment")}</p>
                <p className="font-semibold text-sm">{tList(paymentKey)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2.5 p-2.5">
              <Icons.package className="size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">{t("items")}</p>
                <p className="font-semibold text-sm">
                  {t("itemsCount", { count: itemsCount })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Customer */}
        {order.customer && (
          <Card>
            <div className="p-2.5">
              <p className="mb-1 font-medium text-muted-foreground text-xs">
                {t("customer")}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{order.customer.name}</p>
                  {phone && (
                    <p className="text-muted-foreground text-sm">{phone}</p>
                  )}
                </div>
                {phone && (
                  <a
                    href={
                      isWhatsApp
                        ? `https://wa.me/${phone.replace(/\D/g, "")}`
                        : `tel:${phone}`
                    }
                    aria-label={isWhatsApp ? t("openWhatsApp") : t("call")}
                  >
                    <div className="flex size-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      {isWhatsApp ? (
                        <Icons.whatsapp className="size-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Icons.phone className="size-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                  </a>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Delivery Address */}
        {order.address && (
          <Card>
            <div className="space-y-1.5 p-2.5">
              <p className="font-medium text-muted-foreground text-xs">
                {t("deliveryAddress")}
              </p>
              <div className="flex gap-2">
                <Icons.mapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{order.address.city}</p>
                  <p className="text-muted-foreground text-sm">
                    {order.address.street}
                  </p>
                  {order.address.postalCode && (
                    <p className="text-muted-foreground text-sm">
                      {order.address.postalCode}
                    </p>
                  )}
                </div>
              </div>
              {order.notes && (
                <div className="flex gap-1.5 rounded-lg bg-muted/50 p-2">
                  <Icons.fileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <p className="text-sm italic">"{order.notes}"</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Order Items + Summary */}
        <Card>
          <div className="p-2.5">
            <p className="mb-1.5 font-medium text-muted-foreground text-xs">
              {t("orderItems")}
            </p>
            <div className="divide-y">
              {order.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 py-2 first:pt-0 last:pb-0"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name ?? ""}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Icons.package className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">
                      {item.product?.name ?? "—"}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {t("itemsCount", { count: item.quantity })}
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-2" />

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("delivery")}</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm">
                <span>{t("total")}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sticky footer */}
      <div className="fixed inset-x-0 bottom-0 border-t bg-background p-3">
        <div className="mx-auto flex max-w-2xl gap-3">
          <Button
            variant="default"
            className="flex-1"
            disabled={!canAdvance || updateStatusMutation.isPending}
            onClick={() => {
              if (nextStatus) {
                updateStatusMutation.mutate({
                  id: order.id,
                  status: nextStatus,
                });
              }
            }}
          >
            <Icons.packageCheck className="mr-2 size-4" />
            {t("updateStatus")}
          </Button>
          {phone && (
            <Button
              className="flex-1 bg-green-500 text-white hover:bg-green-600"
              asChild
            >
              <a href={`tel:${phone}`}>
                <Icons.phone className="mr-2 size-4" />
                {t("callCustomer", { name: firstName })}
              </a>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
