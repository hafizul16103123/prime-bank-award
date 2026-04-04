import { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<ButtonProps> = ({
	children,
	variant = "primary",
	block = false,
	outline = false,
	size = "md",
	pill = false,
	className = "",
	...rest
}) => {
	const variantStyles: Record<ButtonVariant, string> = {
		primary: "bg-primary text-white hover:bg-primary-dark",
		secondary: "bg-secondary text-white hover:bg-secondary-dark",
		success: "bg-green-500 text-white hover:bg-green-600",
		info: "bg-blue-500 text-white hover:bg-blue-600",
		warning: "bg-yellow-500 text-black hover:bg-yellow-600",
		danger: "bg-red-500 text-white hover:bg-red-600",
		light: "bg-light-green text-primary text-nowrap",
		dark: "bg-gray-800 text-white hover:bg-gray-900",
		link: "bg-transparent text-primary hover:text-secondary",
	};

	const sizeStyles: Record<ElementSize, string> = {
		sm: "px-3 py-1 text-sm",
		md: "px-8 py-1 text-base",
		lg: "px-5 py-3 text-lg",
		xl: "px-6 py-4 text-xl",
	};

	const combinedStyles = `
    ${variantStyles[variant]} 
    ${outline ? "bg-transparent border border-current text-current hover:opacity-80" : ""}
    ${block ? "w-full" : ""}
    ${pill ? "rounded-full " : "rounded-lg"} 
    ${sizeStyles[size]} 
    ${className}
  `;

	return (
		<button {...rest} className={` tracking-wide ${combinedStyles}`}>
			{children}
		</button>
	);
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	block?: boolean;
	outline?: boolean;
	size?: ElementSize;
	pill?: boolean;
	className?: string;
}

export type Variant = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";

export type ButtonVariant = Variant | "link";

export type ElementSize = "sm" | "md" | "lg" | "xl";
