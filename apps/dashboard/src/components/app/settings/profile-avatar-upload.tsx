"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@dukkani/ui/components/avatar";
import { ImageFileTrigger } from "@dukkani/ui/components/image-file-trigger";
import { useTranslations } from "next-intl";
import type { useProfileController } from "@/shared/lib/profile/controller.hook";

function getInitials(name?: string | null): string {
  if (!name) {
    return "?";
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

interface ProfileAvatarUploadProps {
  user: NonNullable<ReturnType<typeof useProfileController>["user"]>;
  uploadAvatarMutation: ReturnType<
    typeof useProfileController
  >["uploadAvatarMutation"];
}

export function ProfileAvatarUpload({
  user,
  uploadAvatarMutation,
}: ProfileAvatarUploadProps) {
  const t = useTranslations("settings.profile.avatar");

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-16">
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback className="text-base">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <ImageFileTrigger
        variant="avatar"
        maxFiles={1}
        currentCount={0}
        mode="replace"
        multiple={false}
        disabled={uploadAvatarMutation.isPending}
        label={
          uploadAvatarMutation.isPending
            ? `${t("changeLabel")}…`
            : t("changeLabel")
        }
        hint={t("hint")}
        onFilesSelected={([file]) => {
          if (file) {
            uploadAvatarMutation.mutate(file);
          }
        }}
      />
    </div>
  );
}
