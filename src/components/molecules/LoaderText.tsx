import React, { ReactNode } from "react";
import { Text } from "../atoms";

type Variant = "2xl" | "xl" | "lg" | "base" | "sm" | "xs" | "footnote";
type ColorVariant = "primary" | "secondary" | "tertiary" | "white";

interface LoaderTextProps {
	loading: boolean;
	children: ReactNode;
	variant: Variant;
	color?: ColorVariant;
	align?: "left" | "center" | "right" | "justify";
}

export const LoaderText: React.FC<LoaderTextProps> = ({ loading, children, variant, color, align }) => {
	return (
		<Text color={color} variant={variant} align={align}>
			{loading ? "Please wait..." : children}
		</Text>
	);
};
