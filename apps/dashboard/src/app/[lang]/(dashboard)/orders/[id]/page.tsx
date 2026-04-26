"use client";

import { AddressEntity } from "@dukkani/common/entities/address/entity";
import { Alert, AlertTitle } from "@dukkani/ui/components/alert";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Separator } from "@dukkani/ui/components/separator";
import { SlideToConfirm } from "@dukkani/ui/components/slide-to-confirm";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { OrderDetailSkeleton } from "@/components/app/orders/order-detail-skeleton";
import { RoutePaths } from "@/shared/config/routes";
import { useOrderDetailPage } from "@/shared/lib/order/controller.hook";
import { getContactHref } from "@/shared/lib/phone/contact-href.util";
import { getDynamicRouteParam } from "@/shared/lib/route-params.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = getDynamicRouteParam(params, "id");
  const t = useTranslations("orders.detail");
  const tList = useTranslations("orders.list");
  const formatPrice = useFormatPriceForActiveStore();
  const {
    order,
    isLoading,
    isError,
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
    firstName,
  } = useOrderDetailPage(orderId);

  if (!orderId) {
    notFound();
  }

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto max-w-2xl p-4">
        <div className="mb-4 flex items-center gap-2">
          <Link href={RoutePaths.ORDERS.INDEX.url}>
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="font-semibold">{t("title")}</h1>
        </div>
        <Alert variant="destructive">
          <Icons.alertTriangle />
          <AlertTitle>{t("errorLoading")}</AlertTitle>
        </Alert>
      </div>
    );
  }

  const contactHref = phone ? getContactHref(phone, isWhatsApp) : null;
  const isWaLink = contactHref != null && contactHref.startsWith("https://");

  return (
    <>
      <div className="container mx-auto max-w-2xl space-y-2 p-3 pb-24">
        <div className="flex items-center justify-between">
          <Link href={RoutePaths.ORDERS.INDEX.url}>
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="font-semibold text-base">{t("title")}</h1>
          <div className="w-9" />
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <Badge variant={badgeVariant}>{tList(statusKey)}</Badge>
          <p className="font-bold text-4xl tracking-tight">
            {formatPrice(total)}
          </p>
          <p className="mt-1 text-muted-foreground text-xs">
            #{order.id} · {formattedDate}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Card className="gap-0 py-0 shadow-sm">
            <div className="flex items-center gap-2.5 p-3">
              <Icons.payments className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-muted-foreground text-xs">{t("payment")}</p>
                <p className="font-semibold text-sm">{tList(paymentKey)}</p>
              </div>
            </div>
          </Card>
          <Card className="gap-0 py-0 shadow-sm">
            <div className="flex items-center gap-2.5 p-3">
              <Icons.package className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-muted-foreground text-xs">{t("items")}</p>
                <p className="font-semibold text-sm">
                  {t("itemsCount", { count: itemsCount })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {order.customer && (
          <Card className="gap-0 py-0 shadow-sm">
            <div className="p-3">
              <p className="mb-1.5 font-medium text-muted-foreground text-xs">
                {t("customer")}
              </p>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{order.customer.name}</p>
                  {phone && (
                    <p className="text-muted-foreground text-sm">{phone}</p>
                  )}
                </div>
                {contactHref && (
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="shrink-0 rounded-full bg-primary/10 hover:bg-primary/15"
                    asChild
                  >
                    <Link
                      href={contactHref}
                      target={isWaLink ? "_blank" : undefined}
                      rel={isWaLink ? "noopener noreferrer" : undefined}
                      prefetch={false}
                      aria-label={
                        isWhatsApp
                          ? t("openWhatsApp")
                          : t("callCustomer", { name: firstName })
                      }
                    >
                      {isWhatsApp ? (
                        <Icons.whatsapp className="size-4 text-primary" />
                      ) : (
                        <Icons.phone className="size-4 text-primary" />
                      )}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {order.address && (
          <Card className="gap-0 py-0 shadow-sm">
            <div className="space-y-1.5 p-3">
              <p className="font-medium text-muted-foreground text-xs">
                {t("deliveryAddress")}
              </p>
              <div className="flex gap-2">
                <Icons.mapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-sm">
                    {AddressEntity.formatOrderListLocation({
                      city: order.address.city,
                      postalCode: order.address.postalCode,
                    }) ?? order.address.city}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {order.address.street}
                  </p>
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

        <Card className="gap-0 py-0 shadow-sm">
          <div className="p-3">
            <p className="mb-1.5 font-medium text-muted-foreground text-xs">
              {t("orderItems")}
            </p>
            <div className="divide-y divide-border">
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

            <Separator className="my-2 h-0 border-border border-t border-dashed bg-transparent" />

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

      <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          {phone && contactHref ? (
            <Button
              className="shrink-0"
              type="button"
              size="icon"
              variant="outline"
              asChild
            >
              <Link
                href={contactHref}
                target={isWaLink ? "_blank" : undefined}
                rel={isWaLink ? "noopener noreferrer" : undefined}
                prefetch={false}
                aria-label={
                  isWhatsApp
                    ? t("openWhatsApp")
                    : t("callCustomer", { name: firstName })
                }
              >
                {isWhatsApp ? (
                  <Icons.whatsapp className="size-4 text-primary" />
                ) : (
                  <Icons.phone className="size-4 text-primary" />
                )}
              </Link>
            </Button>
          ) : null}
          <SlideToConfirm
            className={phone ? "min-w-0 flex-1" : "w-full"}
            disabled={!canAdvance || updateStatusMutation.isPending}
            icon={<Icons.chevronsRight className="size-4" />}
            onConfirm={() => {
              if (nextStatus) {
                updateStatusMutation.mutate({
                  id: order.id,
                  status: nextStatus,
                });
              }
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Icons.refreshCw className="size-4 shrink-0" />
              {t("slideToUpdate")}
            </span>
          </SlideToConfirm>
        </div>
      </div>
    </>
  );
}
