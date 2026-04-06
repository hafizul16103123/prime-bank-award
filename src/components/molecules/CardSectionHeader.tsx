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
			<h2
				className={cn(
					"text-lg font-semibold text-foreground sm:text-xl md:text-xl lg:text-2xl xl:text-2xl",
					titleClassName,
				)}
			>
				{title}
			</h2>
			{hasDescription ? (
				<p
					className={cn(
						"mt-2 mb-3 text-sm leading-relaxed text-muted-ink sm:mt-[10px] sm:mb-4 sm:text-[15px] md:text-base lg:text-base xl:text-base",
						descriptionClassName,
					)}
				>
					{description}
				</p>
			) : null}
		</header>
	);
}
