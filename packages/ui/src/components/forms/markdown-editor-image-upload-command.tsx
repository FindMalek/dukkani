import type { ICommand } from "@uiw/react-md-editor";
import { insertTextAtPosition } from "@uiw/react-md-editor";
import { Image as ImageIcon } from "lucide-react";

/** Builds a markdown image reference, escaping characters that would break the link syntax. */
function toImageMarkdown(name: string, url: string): string {
  return `![${name.replace(/[[\]]/g, "")}](${url})\n`;
}

/**
 * Toolbar command that opens a file picker, uploads the picked image via
 * `uploadFile`, then inserts a markdown image reference at the cursor.
 * Upload failures are forwarded to `onError` (never an unhandled rejection).
 */
export function buildImageUploadCommand(
  uploadFile: (file: File) => Promise<string>,
  label: string,
  onError?: (error: unknown) => void,
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
        try {
          const url = await uploadFile(file);
          api.replaceSelection(toImageMarkdown(file.name, url));
        } catch (error) {
          onError?.(error);
        }
      };
      input.click();
    },
  };
}

/**
 * Synchronously finds the first image file in a paste/drop event's file list.
 * Callers must check this (and call `preventDefault` themselves) before the
 * event handler returns — `preventDefault` has no effect once called from
 * inside an `async` continuation, since the browser applies the event's
 * default action synchronously right after dispatch.
 */
export function findImageFile(
  files: FileList | null | undefined,
): File | undefined {
  return files
    ? Array.from(files).find((f) => f.type.startsWith("image/"))
    : undefined;
}

/**
 * Uploads an image file (see `findImageFile`) and inserts a markdown image
 * reference at the cursor. Upload failures are forwarded to `onError` rather
 * than becoming an unhandled rejection.
 */
export async function handleImageFileTransfer(
  file: File,
  textarea: HTMLTextAreaElement,
  uploadFile: (file: File) => Promise<string>,
  onError?: (error: unknown) => void,
): Promise<void> {
  try {
    const url = await uploadFile(file);
    insertTextAtPosition(textarea, toImageMarkdown(file.name, url));
  } catch (error) {
    onError?.(error);
  }
}
