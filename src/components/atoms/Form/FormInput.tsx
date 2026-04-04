import Image from "next/image";
import { forwardRef, InputHTMLAttributes } from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: any;
	bgColor?: boolean;
	error?: string;
	required?: boolean;
	pill?: boolean;
}
export const FormInput = forwardRef<HTMLInputElement, PropsType>(
	({ label, icon, bgColor, error, required, value, placeholder, pill = false, ...rest }, ref) => {
		return (
			<div className="">
				{label && (
					<p className={`font-normal  mb-1  text-sm `}>
						{label} <span className="text-red-500 ">{required && "*"}</span>
					</p>
				)}

				<div className="flex items-center">
					{icon && (
						<div className="ml-3 -mr-7 z-10">
							<Image src={icon} alt="" width={16} height={16} />
						</div>
					)}
					<input
						{...rest}
						ref={ref}
						placeholder={placeholder}
						className={`${icon ? "pl-8" : "px-6 py-4" /* Reduced left padding when icon exists */}  ${
							pill
								? "border-none rounded-full px-6 py-4"
								: "border border-default rounded-[8px] px-4 py-[14px]"
						}  bg-default   text-primary ring-4 ring-transparent placeholder:text-gray-400 placeholder:text-sm text-sm focus:!border-primary focus:ring-primary/10 w-full outline-none font-light`}
						value={value}
					/>
				</div>
				{error && <p className="text-red-500  text-sm">{error}</p>}
			</div>
		);
	}
);
FormInput.displayName = "FormInput";
