import React from "react";

type Variant = "4xl" | "3xl" | "2xl" | "xl" | "lg" | "base" | "sm" | "xs" | "footnote";
type ColorVariant = "primary" | "secondary" | "tertiary" | "white" | "green";
type FontWeight = "regular" | "bold" | "semibold" | "medium" | "light";
type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none";
type Display = "block" | "inline" | "inline-block";

interface CustomTextProps extends React.HTMLAttributes<HTMLSpanElement> {
	className?: string;
	variant?: Variant;
	color?: ColorVariant;
	align?: "left" | "center" | "right" | "justify";
	weight?: FontWeight;
	transform?: TextTransform;
	display?: Display;
	children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
	"4xl": "text-[48px]",
	"3xl": "text-[32px]",
	"2xl": "text-[24px] ",
	xl: "text-[20px] ",
	lg: "text-[18px] ",
	base: "text-[16px] ",
	sm: "text-[14px] ",
	xs: "text-[12px] ",
	footnote: "text-[10px] ",
};

const colorMap: Record<ColorVariant, string> = {
	primary: "text-secondary",
	secondary: "text-gray",
	tertiary: "text-default",
	white: "text-white",
	green: "text-green",
};

const weightMap: Record<FontWeight, string> = {
	regular: "font-normal",
	bold: "font-bold",
	semibold: "font-semibold",
	medium: "font-medium",
	light: "font-light",
};

const displayMap: Record<Display, string> = {
	block: "block",
	inline: "inline",
	"inline-block": "inline-block",
};

export const Text: React.FC<CustomTextProps> = ({
	className,
	variant = "base",
	color = "primary",
	align = "left",
	weight = "regular",
	transform = "none",
	display = "block",
	children,
	...props
}) => {
	const baseClasses = variantClasses[variant];
	const hasCustomColor = className?.includes("text-") && !className.includes("text-[");
	const colorClass = hasCustomColor ? "" : colorMap[color];
	const alignClass = align ? `text-${align}` : "";
	const transformClass = transform !== "none" ? transform : "";
	const fontWeightClass = weightMap[weight];
	const displayClass = displayMap[display];

	const combinedClass = [
		"font-sans",
		baseClasses,
		colorClass,
		alignClass,
		fontWeightClass,
		transformClass,
		displayClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<span className={combinedClass} {...props}>
			{children}
		</span>
	);
};
