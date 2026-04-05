"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type FormSelectOption = {
	value: string;
	label: ReactNode;
};

function FormSelectTriggerInner({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const { formItemId, error } = useFormField();

	return (
		<SelectTrigger
			id={formItemId}
			className={cn("w-full min-w-0", className)}
			aria-invalid={!!error}
		>
			{children}
		</SelectTrigger>
	);
}

type FormSelectFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>;
	name: FieldPath<TFieldValues>;
	/** Omit when the layout provides a column header (e.g. marksheet grid). */
	label?: string;
	placeholder?: string;
	options: FormSelectOption[];
	triggerClassName?: string;
	className?: string;
	hideLabel?: boolean;
};

export function FormSelectField<TFieldValues extends FieldValues>({
	control,
	name,
	label,
	placeholder = "Select",
	options,
	triggerClassName,
	className,
	hideLabel,
}: FormSelectFieldProps<TFieldValues>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					{label != null && label !== "" ? (
						<FormLabel className={hideLabel ? "sr-only" : undefined}>{label}</FormLabel>
					) : null}
					<Select
						value={field.value ? String(field.value) : null}
						onValueChange={(v) => field.onChange(v ?? "")}
					>
						<FormSelectTriggerInner className={triggerClassName}>
							<SelectValue placeholder={placeholder} />
						</FormSelectTriggerInner>
						<SelectContent>
							{options.map((opt) => (
								<SelectItem key={String(opt.value)} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
