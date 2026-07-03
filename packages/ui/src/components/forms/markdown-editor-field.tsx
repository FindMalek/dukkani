"use client";

import MDEditor, { commands } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { useTheme } from "next-themes";
import { useFieldContext } from "../../hooks/use-app-form";
import { BaseField, type CommonFieldProps } from "./base-field";
import {
  buildImageUploadCommand,
  handleImageFileTransfer,
} from "./markdown-editor-image-upload-command";

interface MarkdownEditorFieldProps extends CommonFieldProps {
  placeholder?: string;
  minHeight?: number;
  /** Uploads a file to storage and resolves to its public URL. Enables the image toolbar button and paste/drop-to-insert. */
  onImageUpload?: (file: File) => Promise<string>;
  /** Called when an inline image upload fails (toolbar button, paste, or drop). */
  onImageUploadError?: (error: unknown) => void;
  imageUploadLabel?: string;
}

export function MarkdownEditorField({
  label,
  description,
  orientation,
  placeholder,
  minHeight = 160,
  onImageUpload,
  onImageUploadError,
  imageUploadLabel = "Insert image",
}: MarkdownEditorFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const { resolvedTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  const toolbarCommands = [
    commands.bold,
    commands.italic,
    commands.unorderedListCommand,
    commands.link,
    ...(onImageUpload
      ? [
          buildImageUploadCommand(
            onImageUpload,
            imageUploadLabel,
            onImageUploadError,
          ),
        ]
      : []),
  ];

  return (
    <BaseField
      label={label}
      description={description}
      orientation={orientation}
    >
      <div className="w-full" aria-invalid={isInvalid}>
        <MDEditor
          value={field.state.value}
          onChange={(value) => field.handleChange(value ?? "")}
          commands={toolbarCommands}
          extraCommands={[
            commands.codeEdit,
            commands.codeLive,
            commands.codePreview,
          ]}
          preview="edit"
          height={minHeight}
          data-color-mode={colorMode}
          textareaProps={{
            id: field.name,
            name: field.name,
            placeholder,
            onBlur: field.handleBlur,
            onPaste: onImageUpload
              ? async (event) => {
                  const handled = await handleImageFileTransfer(
                    event.clipboardData?.files,
                    event.currentTarget,
                    onImageUpload,
                    onImageUploadError,
                  );
                  if (handled) event.preventDefault();
                }
              : undefined,
            onDrop: onImageUpload
              ? async (event) => {
                  const handled = await handleImageFileTransfer(
                    event.dataTransfer?.files,
                    event.currentTarget,
                    onImageUpload,
                    onImageUploadError,
                  );
                  if (handled) event.preventDefault();
                }
              : undefined,
          }}
        />
      </div>
    </BaseField>
  );
}
