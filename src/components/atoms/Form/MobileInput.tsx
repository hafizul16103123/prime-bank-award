import { formatCanadianPhoneNumber } from "@/utils/helpers/format.helpers";
import React from "react";
import { FormInput } from "./FormInput";

type NumberInputProps = {
	name: string;
	label: string;
	error?: string;
	placeholder?: string;
	setValue: any;
	register: Function;
	required?: boolean;
};

export const MobileInput = ({ name, label, error, required, placeholder, setValue, register }: NumberInputProps) => {
	return (
		<FormInput
			required={required}
			{...register(name, {
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
					const rawValue = e.target.value.replace(/\D/g, "").slice(0, 14);
					const formatted = formatCanadianPhoneNumber(rawValue);
					setValue(name, formatted);
				},
			})}
			maxLength={14}
			error={error}
			label={label}
			type="text"
			placeholder={placeholder}
		/>
	);
};
