import Image from "next/image";
import React from "react";

interface AvatarProps {
	image?: string;
	fallbackText?: string;
	size?: "sm" | "lg" | "xl" | "2xl" | "3xl";
}

const sizeMap: Record<NonNullable<AvatarProps["size"]>, number> = {
	sm: 32,
	lg: 48,
	xl: 64,
	"2xl": 80,
	"3xl": 100,
};

export const Avatar: React.FC<AvatarProps> = ({ image, fallbackText = "", size = "sm" }) => {
	const dimension = sizeMap[size];

	return (
		<div
			className="rounded-full overflow-hidden bg-[#dbdbdb] flex items-center justify-center"
			style={{ width: dimension, height: dimension }}
		>
			{image ? (
				<Image
					src={image}
					alt={fallbackText || "Avatar"}
					width={dimension}
					height={dimension}
					style={{ objectFit: "cover" }}
				/>
			) : (
				<span className="uppercase text-xs text-white">{fallbackText}</span>
			)}
		</div>
	);
};
