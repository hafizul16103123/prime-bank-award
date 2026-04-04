"use client";
import Image from "next/image";
import { useState } from "react";

export const RadioButton = () => {
	const [selected, setSelected] = useState(false);
	return (
		<label className="cursor-pointer">
			<input type="radio" name="square-radio" onChange={() => setSelected(true)} className="hidden" />
			<div
				className={`w-5 h-5  flex items-center justify-center rounded-md transition-all ${
					selected ? "border-2 border-primary" : "border-2 border-lightGray"
				} `}
			>
				{selected && (
					<Image src="/images/icons/read.png" alt="" width={16} height={16} className="opacity-70" />
				)}
			</div>
		</label>
	);
};
