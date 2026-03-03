import { useCallback, useState } from "react";
import { useFieldContext, useFormContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import { Icons } from "../icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group";

type ArrayFieldProps = {
	as: "text-pills";
    fromKey?: string;
};
export function ArrayField({ as: _as, fromKey }: ArrayFieldProps) {
	const arrayField = useFieldContext<string[]>();
	const form = useFormContext();
	const [draftValue, setDraftValue] = useState("");

	const handlePillDelete = useCallback(
		(index: number) => {
			arrayField.setValue((prev) => {
				const newValues = [...prev];
				newValues.splice(index, 1);
				return newValues;
			});
		},
		[arrayField],
	);

	const handlePushDraft = useCallback(() => {
		const trimmed = draftValue.trim();
		if (!trimmed) return;
		if (arrayField.state.value.some((value) => value.trim() === trimmed))
			return;
		arrayField.pushValue(trimmed);
		setDraftValue("");
	}, [arrayField, draftValue]);

	return (
		<div className="grid grid-cols-2 gap-2">
			{arrayField.state.value.map((_value, index) => (
				<form.Field
					key={`${arrayField.name}[${index}]`}
                    // @ts-expect-error - dynamic array path
					name={fromKey ? `${arrayField.name}[${index}].${fromKey}` : `${arrayField.name}[${index}]`}
				>
					{(field) => (
						<EditablePill
							value={field.state.value}
							onDelete={() => handlePillDelete(index)}
                            // @ts-expect-error - dynamic array path
							onEdit={(value) => field.handleChange(value)}
						/>
					)}
				</form.Field>
			))}
			<InputGroup className="rounded-full">
				<InputGroupInput
					value={draftValue}
					className="text-center text-xs"
					onChange={(e) => setDraftValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handlePushDraft();
						}
					}}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						type="button"
						variant="secondary"
						className="rounded-full"
						size="icon-xs"
						onClick={handlePushDraft}
						disabled={!draftValue.trim()}
					>
						<Icons.plus className="size-3" />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}

function EditablePill({
	value,
	onDelete,
	onEdit,
}: {
	value: string;
	onDelete: () => void;
	onEdit: (value: string) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedValue, setEditedValue] = useState(value);
	const onEditFinish = useCallback(() => {
		setIsEditing(false);
		onEdit?.(editedValue.trim());
	}, [onEdit, editedValue]);
	return (
		<InputGroup className="group/pill rounded-full">
			<InputGroupInput
				value={editedValue}
				className={cn(
					"text-center text-xs",
					isEditing ? "cursor-text" : "cursor-default",
				)}
				readOnly={!isEditing}
				onChange={(e) => setEditedValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "escape") {
						setIsEditing(false);
					}
					if (e.key === "Enter") {
						e.preventDefault();
						onEditFinish();
					}
				}}
			/>

			<InputGroupAddon align="inline-end">
				{isEditing ? (
					<InputGroupButton
						type="button"
						variant="ghost"
						className="rounded-full"
						size="icon-xs"
						onClick={onEditFinish}
					>
						<Icons.check className="size-3" />
					</InputGroupButton>
				) : (
					<InputGroupButton
						type="button"
						variant="ghost"
						className="rounded-full"
						size="icon-xs"
						onClick={() => setIsEditing(true)}
					>
						<Icons.edit className="size-3" />
					</InputGroupButton>
				)}
				{!isEditing && (
					<InputGroupButton
						type="button"
						variant="ghost"
						className="rounded-full"
						size="icon-xs"
						onClick={onDelete}
					>
						<Icons.trash className="size-3" />
					</InputGroupButton>
				)}
			</InputGroupAddon>
		</InputGroup>
	);
}
