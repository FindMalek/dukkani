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
import { Skeleton } from "@dukkani/ui/components/skeleton";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProfilePersonalInfoCard } from "@/components/app/settings/profile-personal-info-card";
import { ProfileSecurityCard } from "@/components/app/settings/profile-security-card";
import { RoutePaths } from "@/shared/config/routes";
import { useProfileController } from "@/shared/lib/profile/controller.hook";

function PersonalInfoCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
}

export default function ProfileSettingsPage() {
  const t = useTranslations("settings.profile");
  const {
    user,
    isUserPending,
    isAccountsPending,
    hasPasswordAccount,
    oauthProviderId,
    uploadAvatarMutation,
  } = useProfileController();

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6">
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

      <div className="grid gap-6 md:grid-cols-2">
        {isUserPending || !user ? (
          <PersonalInfoCardSkeleton />
        ) : (
          <ProfilePersonalInfoCard
            user={user}
            uploadAvatarMutation={uploadAvatarMutation}
          />
        )}

        <ProfileSecurityCard
          isLoading={isAccountsPending}
          hasPasswordAccount={hasPasswordAccount}
          oauthProviderId={oauthProviderId}
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t("preferences.title")}</CardTitle>
          <CardDescription>{t("preferences.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-sm">
                {t("preferences.emailNotifications")}
              </label>
              <p className="text-muted-foreground text-sm">
                {t("preferences.emailNotificationsDescription")}
              </p>
            </div>
            <Badge variant="secondary">{t("preferences.comingSoon")}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-sm">
                {t("preferences.smsNotifications")}
              </label>
              <p className="text-muted-foreground text-sm">
                {t("preferences.smsNotificationsDescription")}
              </p>
            </div>
            <Badge variant="secondary">{t("preferences.comingSoon")}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
