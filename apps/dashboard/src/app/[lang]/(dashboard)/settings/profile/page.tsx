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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@dukkani/ui/components/field";
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
        <div className="flex items-center gap-4">
          <Skeleton className="size-20 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
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

      <div className="flex flex-col gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>{t("preferences.title")}</CardTitle>
            <CardDescription>{t("preferences.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="gap-3">
              <Field
                orientation="horizontal"
                className="rounded-lg border p-4"
              >
                <FieldContent>
                  <FieldTitle>
                    {t("preferences.emailNotifications")}
                  </FieldTitle>
                  <FieldDescription>
                    {t("preferences.emailNotificationsDescription")}
                  </FieldDescription>
                </FieldContent>
                <Badge variant="secondary">
                  {t("preferences.comingSoon")}
                </Badge>
              </Field>
              <Field
                orientation="horizontal"
                className="rounded-lg border p-4"
              >
                <FieldContent>
                  <FieldTitle>{t("preferences.smsNotifications")}</FieldTitle>
                  <FieldDescription>
                    {t("preferences.smsNotificationsDescription")}
                  </FieldDescription>
                </FieldContent>
                <Badge variant="secondary">
                  {t("preferences.comingSoon")}
                </Badge>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
