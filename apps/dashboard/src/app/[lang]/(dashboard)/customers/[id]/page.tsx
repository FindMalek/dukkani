"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@dukkani/ui/components/alert-dialog";
import { notFound, useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CustomerDetailContactCard } from "@/components/app/customers/customer-detail-contact-card";
import { CustomerDetailErrorState } from "@/components/app/customers/customer-detail-error-state";
import { CustomerDetailHeader } from "@/components/app/customers/customer-detail-header";
import { CustomerDetailLocationsCard } from "@/components/app/customers/customer-detail-locations-card";
import { CustomerDetailNotesCard } from "@/components/app/customers/customer-detail-notes-card";
import { CustomerDetailOrdersCard } from "@/components/app/customers/customer-detail-orders-card";
import { CustomerDetailSkeleton } from "@/components/app/customers/customer-detail-skeleton";
import { CustomerDetailSummaryCard } from "@/components/app/customers/customer-detail-summary-card";
import { RoutePaths } from "@/shared/config/routes";
import { useCustomerDetailPage } from "@/shared/lib/customer/controller.hook";
import { getContactHref } from "@/shared/lib/phone/contact-href.util";
import { getDynamicRouteParam } from "@/shared/lib/route-params.util";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("customers.detail");
  const customerId = getDynamicRouteParam(params, "id");
  const formatPrice = useFormatPriceForActiveStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { customer, isLoading, isError, isNotFoundError, deleteCustomerMutation } =
    useCustomerDetailPage(customerId);

  if (!customerId) {
    notFound();
  }

  if (isLoading) {
    return <CustomerDetailSkeleton />;
  }

  if (isError || !customer) {
    return (
      <CustomerDetailErrorState
        errorMessage={isNotFoundError ? t("notFound") : t("errorLoading")}
      />
    );
  }

  const contactHref = getContactHref(customer.phone, customer.prefersWhatsApp);
  const isWaLink = contactHref.startsWith("https://");
  const canDelete = customer.orderCount === 0;

  const handleDeleteConfirm = () => {
    deleteCustomerMutation.mutate(
      { id: customer.id },
      { onSuccess: () => router.push(RoutePaths.CUSTOMERS.INDEX.url) },
    );
  };

  return (
    <div className="container mx-auto max-w-2xl space-y-2 p-3 pb-8">
      <CustomerDetailHeader
        title={customer.name}
        contactHref={contactHref}
        isWhatsApp={customer.prefersWhatsApp}
        canDelete={canDelete}
        onDeleteRequest={() => setDeleteDialogOpen(true)}
      />

      <CustomerDetailSummaryCard
        totalSpentFormatted={formatPrice(customer.totalSpent)}
        orderCount={customer.orderCount}
        avgOrderValueFormatted={formatPrice(customer.avgOrderValue)}
        customerSinceFormatted={new Date(customer.createdAt).toLocaleDateString()}
      />

      <CustomerDetailContactCard
        phone={customer.phone}
        contactHref={contactHref}
        isWhatsApp={customer.prefersWhatsApp}
        isWaLink={isWaLink}
        callLabel={t("call")}
        whatsappLabel={t("whatsapp")}
      />

      <CustomerDetailLocationsCard addresses={customer.addresses} />

      <CustomerDetailOrdersCard orders={customer.orders} />

      <CustomerDetailNotesCard customerId={customer.id} notes={customer.notes} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirmBody")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("confirmDelete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
