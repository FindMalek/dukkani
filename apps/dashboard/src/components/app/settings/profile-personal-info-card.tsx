"use client";

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
  FieldLabel,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Input } from "@dukkani/ui/components/input";
import { Separator } from "@dukkani/ui/components/separator";
import { useTranslations } from "next-intl";
import { ProfileAvatarUpload } from "@/components/app/settings/profile-avatar-upload";
import {
  usePersonalInfoForm,
  type useProfileController,
} from "@/shared/lib/profile/controller.hook";

interface ProfilePersonalInfoCardProps {
  user: NonNullable<ReturnType<typeof useProfileController>["user"]>;
  uploadAvatarMutation: ReturnType<
    typeof useProfileController
  >["uploadAvatarMutation"];
}

/**
 * Only ever mounted once `user` has loaded (see the page's loading guard) —
 * `usePersonalInfoForm` seeds its default values from `user.name` on this
 * component's first render, so it must not render before that data exists.
 */
export function ProfilePersonalInfoCard({
  user,
  uploadAvatarMutation,
}: ProfilePersonalInfoCardProps) {
  const t = useTranslations("settings.profile");
  const form = usePersonalInfoForm(user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personalInfo.title")}</CardTitle>
        <CardDescription>{t("personalInfo.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileAvatarUpload
          user={user}
          uploadAvatarMutation={uploadAvatarMutation}
        />

        <Separator />

        <Form onSubmit={form.handleSubmit}>
          <form.AppForm>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.TextInput
                    label={t("personalInfo.nameLabel")}
                    placeholder={t("personalInfo.namePlaceholder")}
                  />
                )}
              </form.AppField>
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor="profile-email">
                    {t("personalInfo.emailLabel")}
                  </FieldLabel>
                  <Input
                    id="profile-email"
                    type="email"
                    value={user.email}
                    disabled
                    readOnly
                  />
                  <FieldDescription>
                    {t("personalInfo.emailDescription")}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
            <form.Subscribe>
              {(formState) => (
                <Button
                  type="submit"
                  className="mt-6"
                  disabled={!formState.canSubmit || formState.isSubmitting}
                  isLoading={formState.isSubmitting}
                >
                  {t("personalInfo.submit")}
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </Form>
      </CardContent>
    </Card>
  );
}
