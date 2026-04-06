type SectionHeaderProps = {
	title: React.ReactNode;
	description?: string;
	className?: string;
};

export const SectionHeader = ({ title, description, className = "" }: SectionHeaderProps) => {
	return (
		<div className={`text-center ${className}`}>
			<h1 className="text-balance text-3xl  leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight md:text-5xl md:leading-[1.1] lg:text-6xl xl:text-[4.25rem] xl:leading-[1.08]">
				{title}
			</h1>

			{description && (
				<p className="mx-auto mt-4 max-w-[52rem] px-1 text-sm  text-ink sm:mt-5 sm:text-lg sm:leading-relaxed md:mt-6 md:text-base lg:text-lg 3xl:text-xl leading-[20px] md:leading-7">
					{description}
				</p>
			)}
		</div>
	);
};
