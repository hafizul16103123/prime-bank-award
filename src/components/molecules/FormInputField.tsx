"use client";

import type * as React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

type FormInputFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>;
	name: FieldPath<TFieldValues>;
	/** Omit when an external header supplies the label (e.g. marksheet grid). */
	label?: string;
	className?: string;
	hideLabel?: boolean;
} & Omit<React.ComponentProps<typeof Input>, "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "ref">;

export function FormInputField<TFieldValues extends FieldValues>({
	control,
	name,
	label,
	className,
	hideLabel,
	...inputProps
}: FormInputFieldProps<TFieldValues>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					{label != null && label !== "" ? (
						<FormLabel className={hideLabel ? "sr-only" : undefined}>{label}</FormLabel>
					) : null}
					<FormControl>
						<Input {...field} {...inputProps} value={(field.value as string | undefined) ?? ""} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
