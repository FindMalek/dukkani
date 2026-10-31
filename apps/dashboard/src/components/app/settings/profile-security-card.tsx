"use client";

import { changePasswordInputSchema } from "@dukkani/common/schemas/user/input";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dukkani/ui/components/card";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { authClient } from "@/shared/api/auth-client";
import { handleAPIError } from "@/shared/api/error-handler";

const PROVIDER_ICONS = {
  google: Icons.google,
  apple: Icons.apple,
  facebook: Icons.facebook,
} as const;

function providerLabel(providerId: string): string {
  return providerId.charAt(0).toUpperCase() + providerId.slice(1);
}

interface ProfileSecurityCardProps {
  isLoading: boolean;
  hasPasswordAccount: boolean;
  oauthProviderId: string | undefined;
}

export function ProfileSecurityCard({
  isLoading,
  hasPasswordAccount,
  oauthProviderId,
}: ProfileSecurityCardProps) {
  const t = useTranslations("settings.profile");

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-2 h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-9 w-32" />
        </CardContent>
      </Card>
    );
  }

  if (!hasPasswordAccount) {
    const ProviderIcon = oauthProviderId
      ? PROVIDER_ICONS[oauthProviderId as keyof typeof PROVIDER_ICONS]
      : undefined;

    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("oauth.title")}</CardTitle>
          <CardDescription>{t("oauth.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="gap-1.5 py-1.5">
            {ProviderIcon ? <ProviderIcon className="size-3.5" /> : null}
            {t("oauth.badge", {
              provider: oauthProviderId
                ? providerLabel(oauthProviderId)
                : t("oauth.title"),
            })}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return <ChangePasswordCard />;
}

function ChangePasswordCard() {
  const t = useTranslations("settings.profile.security");

  const form = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onSubmit: changePasswordInputSchema },
    onSubmit: async ({ value, formApi }) => {
      const { error } = await authClient.changePassword({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      });
      if (error) {
        handleAPIError(error);
        return;
      }
      formApi.reset();
      toast.success(t("success"));
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={form.handleSubmit}>
          <form.AppForm>
            <FieldGroup>
              <form.AppField name="currentPassword">
                {(field) => (
                  <field.PasswordInput
                    label={t("currentPasswordLabel")}
                    placeholder={t("currentPasswordPlaceholder")}
                    autoComplete="current-password"
                  />
                )}
              </form.AppField>
              <form.AppField name="newPassword">
                {(field) => (
                  <field.PasswordInput
                    label={t("newPasswordLabel")}
                    placeholder={t("newPasswordPlaceholder")}
                    autoComplete="new-password"
                  />
                )}
              </form.AppField>
              <form.AppField name="confirmPassword">
                {(field) => (
                  <field.PasswordInput
                    label={t("confirmPasswordLabel")}
                    placeholder={t("confirmPasswordPlaceholder")}
                    autoComplete="new-password"
                  />
                )}
              </form.AppField>
            </FieldGroup>
            <form.Subscribe>
              {(formState) => (
                <Button
                  type="submit"
                  className="mt-6"
                  disabled={!formState.canSubmit || formState.isSubmitting}
                  isLoading={formState.isSubmitting}
                >
                  {t("submit")}
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </Form>
      </CardContent>
    </Card>
  );
}
