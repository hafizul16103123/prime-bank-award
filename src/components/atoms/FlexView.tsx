import React from "react";

interface FlexViewProps {
	flexDirection?: "row" | "column";
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	items?: "start" | "center" | "end" | "stretch" | "baseline";
	gap?: string;
	className?: string;
	children: React.ReactNode;
}

const getFlexDirectionClass = (direction?: string) => {
	if (direction === "row") return " flex-row";
	if (direction === "column") return " flex-col";
	return "";
};

const getJustifyClass = (justify?: string) => {
	if (!justify) return "";
	return `justify-${justify}`;
};

const getItemsClass = (items?: string) => {
	if (!items) return "";
	return `items-${items}`;
};
const getGapClass = (gap?: string) => {
	if (!gap) return "";

	if (/^\d+$/.test(gap)) return `gap-${gap}`;

	if (gap.startsWith("[") && gap.endsWith("]")) return `gap-${gap}`;

	return `gap-[${gap.replace(/^\[|\]$/g, "")}]`;
};
export const FlexView: React.FC<FlexViewProps> = ({ flexDirection, justify, items, gap, className, children }) => {
	const directionClass = getFlexDirectionClass(flexDirection);
	const justifyClass = getJustifyClass(justify);
	const itemsClass = getItemsClass(items);
	const gapClass = getGapClass(gap);

	const combinedClass = ["flex", directionClass, justifyClass, itemsClass, gapClass, className]
		.filter(Boolean)
		.join(" ");

	return <div className={combinedClass}>{children}</div>;
};
