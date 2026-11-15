"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Label } from "@dukkani/ui/components/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";

export default function WhatsAppSettingsPage() {
  const t = useTranslations("settings.whatsapp");

  const { data: stores, isLoading: storesLoading } = useQuery(
    appQueries.store.all(),
  );

  return (
    <div className="mx-auto w-full p-4 md:p-6 xl:max-w-2xl">
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-4">
          <Link href={RoutePaths.SETTINGS.INDEX.url}>
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              {t("description")}
            </p>
          </div>
        </div>
      </div>

      {storesLoading && (
        <div className="flex items-center justify-center py-12">
          <Icons.spinner className="h-8 w-8 animate-spin" />
        </div>
      )}

      {!storesLoading && (!stores || stores.length === 0) && (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground text-sm">
            {t("noStores")}
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {stores?.map((store) => (
          <WhatsAppStoreCard
            key={store.id}
            storeId={store.id}
            storeName={store.name}
          />
        ))}
      </div>
    </div>
  );
}

function WhatsAppStoreCard({
  storeId,
  storeName,
}: {
  storeId: string;
  storeName: string;
}) {
  const t = useTranslations("settings.whatsapp");

  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [notificationNumber, setNotificationNumber] = useState("");

  const { data: status, isLoading: statusLoading } = useQuery(
    appQueries.kapso.status({ input: { storeId } }),
  );

  const connectMutation = useMutation(appMutations.kapso.connect());
  const disconnectMutation = useMutation(appMutations.kapso.disconnect());
  const testMessageMutation = useMutation(appMutations.kapso.sendTestMessage());

  const handleConnect = () => {
    if (!phoneNumberId.trim() || !notificationNumber.trim()) {
      toast.error(t("fieldsRequired"));
      return;
    }
    connectMutation.mutate(
      {
        storeId,
        phoneNumberId: phoneNumberId.trim(),
        notificationNumber: notificationNumber.trim(),
      },
      {
        onSuccess: () => {
          toast.success(t("connectSuccess"));
          setPhoneNumberId("");
          setNotificationNumber("");
        },
        onError: (error: Error) => {
          toast.error(error.message || t("error"));
        },
      },
    );
  };

  const handleDisconnect = () => {
    disconnectMutation.mutate(
      { storeId },
      {
        onSuccess: () => {
          toast.success(t("disconnectSuccess"));
        },
        onError: (error: Error) => {
          toast.error(error.message || t("error"));
        },
      },
    );
  };

  const handleSendTestMessage = () => {
    testMessageMutation.mutate(
      { storeId },
      {
        onSuccess: () => {
          toast.success(t("testMessageSuccess"));
        },
        onError: (error: Error) => {
          toast.error(error.message || t("error"));
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.whatsapp className="h-5 w-5 text-[#25D366]" />
          {storeName}
          {status?.connected && (
            <Badge variant="default" className="ml-auto">
              {t("connectedBadge")}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{t("cardDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {statusLoading ? (
          <div className="flex items-center justify-center py-6">
            <Icons.spinner className="h-6 w-6 animate-spin" />
          </div>
        ) : status?.connected ? (
          <>
            <div className="space-y-2">
              <Label>{t("phoneNumberIdLabel")}</Label>
              <p className="text-muted-foreground text-sm">
                {status.phoneNumberId}
              </p>
            </div>
            <div className="space-y-2">
              <Label>{t("notificationNumberLabel")}</Label>
              <p className="text-muted-foreground text-sm">
                {status.notificationNumber}
              </p>
            </div>
            {status.connectedAt && (
              <div className="space-y-2">
                <Label>{t("connectedSince")}</Label>
                <p className="text-muted-foreground text-sm">
                  {new Date(status.connectedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleSendTestMessage}
                isLoading={testMessageMutation.isPending}
              >
                {t("sendTestMessageButton")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisconnect}
                isLoading={disconnectMutation.isPending}
              >
                {t("disconnectButton")}
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              {t("notConnectedDescription")}
            </p>
            <div className="space-y-2">
              <Label htmlFor={`phoneNumberId-${storeId}`}>
                {t("phoneNumberIdLabel")}
              </Label>
              <Input
                id={`phoneNumberId-${storeId}`}
                placeholder={t("phoneNumberIdPlaceholder")}
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                {t("phoneNumberIdHelp")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`notificationNumber-${storeId}`}>
                {t("notificationNumberLabel")}
              </Label>
              <Input
                id={`notificationNumber-${storeId}`}
                placeholder={t("notificationNumberPlaceholder")}
                value={notificationNumber}
                onChange={(e) => setNotificationNumber(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                {t("notificationNumberHelp")}
              </p>
            </div>
            <Button
              onClick={handleConnect}
              isLoading={connectMutation.isPending}
            >
              {t("connectButton")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
