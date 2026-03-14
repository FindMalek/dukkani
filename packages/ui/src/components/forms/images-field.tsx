"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Dropzone, DropzoneThumb, DropzoneZone } from "../dropzone";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { BaseField, type CommonFieldProps } from "./base-field";

interface ImagesFieldProps extends CommonFieldProps {
	multiple?: boolean;
}

export function ImagesField({
	label,
	description,
	srOnlyLabel,
	multiple = true,
}: ImagesFieldProps) {
	const field = useFieldContext<File[]>();
	const files = field.state.value ?? [];
	const t = useTranslations("fields.images");
	const thumbsRef = React.useRef<HTMLDivElement>(null);

	const scrollToEnd = React.useEffectEvent(() => {
		const viewport = thumbsRef.current?.closest(
			"[data-radix-scroll-area-viewport]",
		);
		if (viewport) viewport.scrollLeft = viewport.scrollWidth;
	});

	React.useEffect(() => {
		if (files.length > 0) {
			scrollToEnd();
		}
	}, [files.length]);

	return (
		<BaseField
			label={label}
			description={description}
			srOnlyLabel={srOnlyLabel}
		>
			<Dropzone
				className="w-full"
				accept={{ "image/*": [] }}
				multiple={multiple}
				files={files.map((file) => ({
					file,
					preview: URL.createObjectURL(file),
				}))}
				onFilesChange={(next) => {
					field.handleChange(
						next.map((fileWithPreview) => fileWithPreview.file),
					);
					field.handleBlur();
				}}
			>
				<div className="flex items-center gap-3">
					{files.length > 0 && (
						<ScrollArea className="max-w-sm">
							<div className="flex gap-3" ref={thumbsRef}>
								{files.map((file) => (
									<DropzoneThumb
										key={file.name}
										fileWithPreview={{
											file,
											preview: URL.createObjectURL(file),
										}}
										className="size-24 shrink-0 rounded-xl"
									/>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					)}

					<DropzoneZone
						className="size-24 shrink-0 rounded-xl border-muted-foreground/20 p-2"
						label={t("label")}
						dragActiveLabel={t("dragActiveLabel")}
						hint={t("hint")}
					/>
				</div>
			</Dropzone>
		</BaseField>
	);
}
