"use client";

import { InputHTMLAttributes } from "react";
import { Input, Label } from "../ui";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	value: string;
	error?: string;
	placeholder?: string;
}

export const FormField = ({ label, value, error, placeholder, ...rest }: FormFieldProps) => {
	return (
		<div className="space-y-1">
			<Label className="text-xs font-normal text-muted-foreground">{label}</Label>
			<div>
				<Input
					{...rest}
					type="text"
					placeholder={placeholder}
					defaultValue={value}
					readOnly
					className="h-9 rounded-md bg-background px-3 text-sm"
				/>
			</div>
			{error && <p className="text-red-500  text-sm">{error}</p>}
		</div>
	);
};
