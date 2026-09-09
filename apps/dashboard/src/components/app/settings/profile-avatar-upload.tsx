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
      <div className="relative shrink-0">
        <Avatar className="size-20 border">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback className="text-lg">
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
          label={t("changeLabel")}
          hint={t("hint")}
          // Shrinks the shared dashed "add image" tile into a circular
          // badge overlaid on the avatar itself. The visible label text is
          // hidden (icon-only, matching the common avatar-badge pattern)
          // but stays in the DOM so it's still the control's accessible
          // name for screen readers.
          className="absolute -right-1 -bottom-1 size-8 gap-0 rounded-full border-2 border-background border-solid bg-muted p-0 shadow-sm hover:bg-accent [&>span:first-of-type]:sr-only [&_svg]:size-4"
          onFilesSelected={([file]) => {
            if (file) {
              uploadAvatarMutation.mutate(file);
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-sm">{user.name}</p>
        <p className="text-muted-foreground text-sm">{user.email}</p>
        <p className="text-muted-foreground text-xs">
          {uploadAvatarMutation.isPending
            ? `${t("changeLabel")}…`
            : t("hint")}
        </p>
      </div>
    </div>
  );
}
