"use client";

import { forwardRef, Ref, useEffect, useRef, useState } from "react";

type Option = {
	label: string;
	value: string;
};

type CustomSelectProps = {
	options: Option[];
	value?: string;
	onChange: (value: string) => void;
	className?: string;
	label?: string;
	required?: boolean;
	error?: string;
};

export const SelectInput = forwardRef<HTMLDivElement, CustomSelectProps>(
	({ options, value, onChange, className = "", label, required, error }, ref: Ref<HTMLDivElement>) => {
		const [selected, setSelected] = useState<Option>(options[0]);
		const [isOpen, setIsOpen] = useState(false);
		const [isFocused, setIsFocused] = useState(false);
		const containerRef = useRef<HTMLDivElement | null>(null);

		useEffect(() => {
			if (value) {
				const selectedOption = options.find((opt) => opt.value === value) || options[0];
				setSelected(selectedOption);
			}
		}, [value, options]);

		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
					setIsOpen(false);
					setIsFocused(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, []);

		const handleSelect = (option: Option) => {
			setSelected(option);
			onChange(option.value);
			setIsOpen(false);
			setIsFocused(false);
		};

		const toggleDropdown = () => {
			setIsOpen((prev) => !prev);
			setIsFocused(true);
		};

		return (
			<div
				ref={(node) => {
					containerRef.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) ref.current = node;
				}}
				className={`relative ${className}`}
			>
				{label && (
					<p className={`font-normal mb-1 text-sm ${error ? "text-red-500" : ""}`}>
						{label}
						{required && <span className="text-red-500"> *</span>}
					</p>
				)}

				<button
					type="button"
					onClick={toggleDropdown}
					className={`
						w-full px-4 h-[48px] text-left rounded-[10px] bg-default flex items-center justify-between
						${isFocused ? "border border-primary" : "border border-transparent"}
						text-gray-900 ring-4 ring-transparent 
						placeholder:text-sm placeholder:font-light placeholder:text-gray-400 
						outline-none text-sm
					`}
				>
					{selected?.label}
					<img
						src="/images/icons/arrow.png"
						alt="dropdown arrow"
						width={20}
						height={20}
						className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[250px] overflow-y-auto z-50 mt-1">
						<ul>
							{options.length > 0 ? (
								options.map((option) => (
									<li
										key={option.value}
										onClick={(e) => {
											e.stopPropagation();
											handleSelect(option);
										}}
										className={`px-4 py-2 text-gray-900 cursor-pointer hover:bg-gray-100 ${
											selected.value === option.value ? "bg-gray-200" : ""
										}`}
									>
										{option.label}
									</li>
								))
							) : (
								<li className="px-4 py-2 text-gray-500 hover:bg-default">No options available</li>
							)}
						</ul>
					</div>
				)}

				{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
			</div>
		);
	}
);

SelectInput.displayName = "SelectInput";
