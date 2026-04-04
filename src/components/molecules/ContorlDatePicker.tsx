"use client";

import { Controller } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

interface ControlDatePickerProps {
	name: string;
	label?: string;
	error?: string;
	placeholder?: string;
	control: any;
	required?: boolean;
	highlight?: boolean;
}

export const ControlDatePicker = ({
	name,
	label,
	error,
	placeholder,
	control,
	required,
	highlight,
	...rest
}: ControlDatePickerProps) => {
	return (
		<div>
			{label && (
				<p
					className={`font-normal mb-1 mt-5 text-sm ${highlight && "text-yellow-700"} ${
						error && "text-red-500"
					}`}
				>
					{label} <span className="text-red-500">{required && "*"}</span>
				</p>
			)}

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Datepicker
						{...field}
						{...rest}
						useRange={false}
						asSingle={true}
						displayFormat="MM/DD/YYYY"
						onChange={(date) => {
							field.onChange(date?.startDate || null);
						}}
						value={field.value ? { startDate: field.value, endDate: field.value } : null}
						inputClassName={`${
							highlight ? "border border-yellow-700" : "border border-lightGray"
						} rounded-[8px] h-12 text-gray-900 ring-4 ring-transparent placeholder:text-gray-400 placeholder:text-sm text-sm focus:!border-primary focus:ring-primary/10 w-full outline-none font-light px-4`}
						containerClassName="relative w-full !border-0 !outline-none !outline-0"
						popoverDirection="down"
					/>
				)}
			/>

			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};
