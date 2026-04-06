type SectionHeaderProps = {
	title: React.ReactNode;
	description?: string;
	className?: string;
};

export const SectionHeader = ({ title, description, className = "" }: SectionHeaderProps) => {
	return (
		<div className={`text-center  ${className}`}>
			<h1 className="text-[70px] text-foreground leading-[80px]">{title}</h1>

			{description && (
				<p className="text-[#212121] text-xl mt-6 max-w-[870px] mx-auto leading-[28px]">{description}</p>
			)}
		</div>
	);
};
