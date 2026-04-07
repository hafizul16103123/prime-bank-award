"use client";

import type { DateValueType } from "react-tailwindcss-datepicker";
import Datepicker from "react-tailwindcss-datepicker";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function formatLocalYmd(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

function parseToPickerValue(value: unknown): DateValueType {
	if (value == null || value === "") return null;
	if (value instanceof Date && !Number.isNaN(value.getTime())) {
		return { startDate: value, endDate: value };
	}
	if (typeof value === "number" && Number.isFinite(value)) {
		const date = new Date(value);
		if (!Number.isNaN(date.getTime())) return { startDate: date, endDate: date };
	}
	if (typeof value === "string") {
		const s = value.trim();
		// Calendar date: strict YYYY-MM-DD or ISO / Mongo-style "2005-05-15T00:00:00.000Z" (use date part in local TZ)
		const cal = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
		if (cal) {
			const y = Number(cal[1]);
			const mo = Number(cal[2]);
			const d = Number(cal[3]);
			const date = new Date(y, mo - 1, d);
			if (!Number.isNaN(date.getTime())) return { startDate: date, endDate: date };
		}
		const parsed = new Date(s);
		if (!Number.isNaN(parsed.getTime())) return { startDate: parsed, endDate: parsed };
	}
	return null;
}

function rangeToYmdString(range: DateValueType): string {
	if (!range?.startDate) return "";
	return formatLocalYmd(range.startDate);
}

interface ControlDatePickerProps<TFieldValues extends FieldValues> {
	name: FieldPath<TFieldValues>;
	label?: string;
	error?: string;
	placeholder?: string;
	control: Control<TFieldValues>;
	required?: boolean;
	highlight?: boolean;
}

export function ControlDatePicker<TFieldValues extends FieldValues>({
	name,
	label,
	error,
	placeholder,
	control,
	required,
	highlight,
}: ControlDatePickerProps<TFieldValues>) {
	return (
		<div className="relative z-[9998] overflow-visible">
			{label && (
				<p
					className={`font-normal mb-1 text-sm text-muted-foreground ${highlight ? "text-yellow-700" : ""} ${
						error ? "text-red-500" : ""
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
						inputId={String(name)}
						inputName={String(name)}
						placeholder={placeholder}
						useRange={false}
						asSingle={true}
						readOnly={false}
						displayFormat="MM/DD/YYYY"
						onChange={(date) => {
							field.onChange(rangeToYmdString(date));
						}}
						value={parseToPickerValue(field.value)}
						inputClassName={`${
							highlight ? "border border-yellow-700" : "border border-input"
						} rounded-[8px] h-12 text-gray-900 ring-4 ring-transparent placeholder:text-gray-400 placeholder:text-sm text-sm focus:!border-primary focus:ring-primary/10 w-full outline-none font-light px-4`}
						containerClassName={(defaultCls: string) =>
							`${defaultCls} relative z-[9998] w-full !border-0 !outline-none !outline-0 overflow-visible`
						}
						popupClassName={(defaultCls: string) => `${defaultCls} !z-[9999]`}
						popoverDirection="down"
					/>
				)}
			/>

			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
