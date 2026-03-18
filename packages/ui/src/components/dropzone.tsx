"use client";

import * as React from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { cn } from "../lib/utils";
import { Icons } from "./icons";

export type FileWithPreview = { file: File; preview: string };

type DropzoneContextValue = {
	files: FileWithPreview[];
	removeFile: (name: string) => void;
	getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
	getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
	isDragActive: boolean;
	isDragAccept: boolean;
	isDragReject: boolean;
};

const DropzoneContext = React.createContext<DropzoneContextValue | null>(null);

function useDropzoneContext() {
	const context = React.useContext(DropzoneContext);
	if (!context) {
		throw new Error(
			"Dropzone compound components must be used within <Dropzone>",
		);
	}
	return context;
}

type DropzoneProps = Omit<DropzoneOptions, "onDrop"> & {
	className?: string;
	children: React.ReactNode;
	files?: FileWithPreview[];
	onFilesChange?: (files: FileWithPreview[]) => void;
};

function Dropzone({
	className,
	children,
	files: controlledFiles,
	onFilesChange,
	...dropzoneOptions
}: DropzoneProps) {
	const [internalFiles, setInternalFiles] = React.useState<FileWithPreview[]>(
		[],
	);

	const isControlled = controlledFiles !== undefined;
	const files = isControlled ? controlledFiles : internalFiles;

	const revokePreviews = React.useEffectEvent(() => {
		return () => {
			files.map((fileWithPreview) =>
				URL.revokeObjectURL(fileWithPreview.preview),
			);
		};
	});

	const setFiles = React.useCallback(
		(next: FileWithPreview[]) => {
			if (!isControlled) setInternalFiles(next);
			onFilesChange?.(next);

			return revokePreviews();
		},
		[isControlled, onFilesChange],
	);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		...dropzoneOptions,
		onDrop(acceptedFiles) {
			const existingNames = new Set(
				files.map((fileWithPreview) => fileWithPreview.file.name),
			);
			const newFiles = acceptedFiles
				.filter((file) => !existingNames.has(file.name))
				.map((file) => ({
					file,
					preview: URL.createObjectURL(file),
				}));
			setFiles([...files, ...newFiles]);
		},
	});

	const removeFile = React.useCallback(
		(name: string) => {
			const next = files.filter((fileWithPreview) => {
				if (fileWithPreview.file.name === name) {
					URL.revokeObjectURL(fileWithPreview.preview);
					return false;
				}
				return true;
			});
			setFiles(next);
		},
		[files, setFiles],
	);

	return (
		<DropzoneContext.Provider
			value={{
				files,
				removeFile,
				getRootProps,
				getInputProps,
				isDragActive,
				isDragAccept,
				isDragReject,
			}}
		>
			<div data-slot="dropzone" className={cn("flex gap-4", className)}>
				{children}
			</div>
		</DropzoneContext.Provider>
	);
}

type DropzoneZoneProps = React.ComponentProps<"div"> & {
	label?: string;
	dragActiveLabel?: string;
	hint?: string;
};

function DropzoneZone({
	className,
	children,
	label = "Drag & drop files here",
	dragActiveLabel = "Drop files here",
	hint = "or click to browse",
	...props
}: DropzoneZoneProps) {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzoneContext();

	return (
		<div
			data-slot="dropzone-zone"
			{...getRootProps({
				className: cn(
					"flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-input border-dashed bg-background text-center transition-colors",
					"hover:border-ring/50 hover:bg-accent/40",
					"focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
					isDragActive && !isDragReject && "border-primary bg-primary/5",
					isDragAccept && "border-primary bg-primary/5",
					isDragReject && "border-destructive bg-destructive/5",
					className,
				),
				...props,
			})}
		>
			<input {...getInputProps()} />
			{children ?? (
				<>
					<Icons.camera className="size-6 text-muted-foreground/60" />
					<p className="text-[10px] text-muted-foreground">
						{isDragActive ? dragActiveLabel : label}
					</p>
				</>
			)}
		</div>
	);
}

function DropzoneThumbs({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	const { files } = useDropzoneContext();

	if (files.length === 0 && children == null) return null;

	return (
		<div
			data-slot="dropzone-thumbs"
			className={cn("flex gap-2", className)}
			{...props}
		>
			{children ??
				files.map((fileWithPreview) => (
					<DropzoneThumb
						key={fileWithPreview.file.name}
						fileWithPreview={fileWithPreview}
					/>
				))}
		</div>
	);
}

type DropzoneThumbProps = {
	fileWithPreview: FileWithPreview;
	className?: string;
};

function DropzoneThumb({ fileWithPreview, className }: DropzoneThumbProps) {
	const { removeFile } = useDropzoneContext();

	return (
		<div
			data-slot="dropzone-thumb"
			className={cn(
				"group relative size-24 overflow-hidden rounded-md border bg-muted",
				className,
			)}
		>
			<img
				src={fileWithPreview.preview}
				alt={fileWithPreview.file.name}
				className="h-full w-full object-cover"
				onLoad={() => URL.revokeObjectURL(fileWithPreview.preview)}
			/>
			<button
				type="button"
				onClick={() => removeFile(fileWithPreview.file.name)}
				className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100"
				aria-label={`Remove ${fileWithPreview.file.name}`}
			>
				<Icons.x className="size-4 text-white" />
			</button>
		</div>
	);
}

export {
	Dropzone,
	DropzoneZone,
	DropzoneThumbs,
	DropzoneThumb,
	useDropzoneContext,
};
