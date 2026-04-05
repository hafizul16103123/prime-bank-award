"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormMessage, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { Control, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

function CheckboxRow<TFieldValues extends FieldValues>({
	label,
	field,
	rowClassName,
}: {
	label: React.ReactNode;
	field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
	rowClassName?: string;
}) {
	const { formItemId } = useFormField();

	return (
		<div
			className={cn(
				"flex items-start gap-3 rounded-lg bg-muted/50 p-3",
				rowClassName,
			)}
		>
			<FormControl>
				<Checkbox
					checked={field.value}
					onCheckedChange={(c) => field.onChange(c === true)}
					className="mt-0.5"
				/>
			</FormControl>
			<label htmlFor={formItemId} className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
				{label}
			</label>
		</div>
	);
}

type FormCheckboxFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>;
	name: FieldPath<TFieldValues>;
	label: React.ReactNode;
	className?: string;
	rowClassName?: string;
};

export function FormCheckboxField<TFieldValues extends FieldValues>({
	control,
	name,
	label,
	className,
	rowClassName,
}: FormCheckboxFieldProps<TFieldValues>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					<CheckboxRow label={label} field={field} rowClassName={rowClassName} />
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
