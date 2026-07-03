import { insertTextAtPosition } from "@uiw/react-md-editor";
import type { ICommand } from "@uiw/react-md-editor";
import { Image as ImageIcon } from "lucide-react";

/** Builds a markdown image reference, escaping characters that would break the link syntax. */
function toImageMarkdown(name: string, url: string): string {
  return `![${name.replace(/[[\]]/g, "")}](${url})\n`;
}

/**
 * Toolbar command that opens a file picker, uploads the picked image via
 * `uploadFile`, then inserts a markdown image reference at the cursor.
 */
export function buildImageUploadCommand(
  uploadFile: (file: File) => Promise<string>,
  label: string,
): ICommand {
  return {
    name: "upload-image",
    keyCommand: "upload-image",
    buttonProps: { "aria-label": label, title: label },
    icon: <ImageIcon size={12} />,
    execute: (_state, api) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        const url = await uploadFile(file);
        api.replaceSelection(toImageMarkdown(file.name, url));
      };
      input.click();
    },
  };
}

/**
 * Uploads the first image file found in a paste/drop event's file list and
 * inserts a markdown image reference at the cursor. No-ops if no image file
 * is present (lets normal text paste/drop proceed).
 */
export async function handleImageFileTransfer(
  files: FileList | null | undefined,
  textarea: HTMLTextAreaElement,
  uploadFile: (file: File) => Promise<string>,
): Promise<boolean> {
  const file = files
    ? Array.from(files).find((f) => f.type.startsWith("image/"))
    : undefined;
  if (!file) return false;

  const url = await uploadFile(file);
  insertTextAtPosition(textarea, toImageMarkdown(file.name, url));
  return true;
}
