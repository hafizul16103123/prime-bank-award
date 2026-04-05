import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardSectionHeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
};

export function CardSectionHeader({
	title,
	description,
	className,
	titleClassName,
	descriptionClassName,
}: CardSectionHeaderProps) {
	const hasDescription = description != null && description !== "";

	return (
		<header className={cn(className)}>
			<h2 className={cn("text-2xl text-foreground", titleClassName)}>{title}</h2>
			{hasDescription ? (
				<p className={cn("mt-[10px] mb-4 text-[#757575]", descriptionClassName)}>{description}</p>
			) : null}
		</header>
	);
}
