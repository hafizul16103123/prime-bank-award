"use client";

import { InputHTMLAttributes } from "react";
import { Input, Label } from "../ui";
import { cn } from "@/lib/utils";

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue"> {
	label?: string;
	value: string;
	error?: string;
	placeholder?: string;
	/**
	 * Default read-only display. Set `false` or pass `onChange` to allow editing (controlled with `value`).
	 */
	readOnly?: boolean;
}

export const FormField = ({
	label,
	value,
	error,
	placeholder,
	readOnly,
	onChange,
	className,
	type = "text",
	...rest
}: FormFieldProps) => {
	const editable = readOnly === false || typeof onChange === "function";

	return (
		<div className="space-y-1">
			{label ? <Label className="text-xs font-normal text-muted-foreground">{label}</Label> : null}
			<div>
				<Input
					{...rest}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
					readOnly={!editable}
					{...(editable ? { value } : { defaultValue: value })}
					className={cn("h-9 rounded-md bg-background px-3 text-sm", className)}
				/>
			</div>
			{error ? <p className="text-sm text-red-500">{error}</p> : null}
		</div>
	);
};
