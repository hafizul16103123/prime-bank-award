import { SectionHeader } from "@/components/ui";
import Image from "next/image";

export const achievementsData = [
	{
		icon: "/images/icons/trophy.png",
		year: "2020",
		title: "Best Bank in Bangladesh",
		description:
			"Recognized by Global Finance, a leading North American financial publication, for excellence in banking and innovation.",
	},
	{
		icon: "/images/icons/assured_workload.png",
		year: "2020",
		title: "Best Digital Bank",
		description:
			"Awarded by Asiamoney for pioneering innovative digital banking services and customer-centric technological solutions.",
	},
	{
		icon: "/images/icons/schema.png",
		year: "2014",
		title: "Business Model Restructuring",
		description: "Completed restructuring and centralization project to boost efficiency and modernize banking.",
	},
];
export const Awards = () => {
	return (
		<div className="mt-16 sm:mt-20 md:mt-28 lg:mt-36 xl:mt-40">
			<div className="mb-4 flex items-center justify-center sm:mb-5">
				<span className="rounded-full border border-[#212121] px-4 py-1 text-xs font-medium text-[#212121] sm:px-5 sm:py-1.5 sm:text-sm">
					Recognition
				</span>
			</div>

			<SectionHeader
				className="mb-8 sm:mb-10 md:mb-11"
				title={
					<>
						Awards & <span className="text-[#757575]">Recognition</span>
					</>
				}
				description="Established in 1995, Prime Bank has grown to become a top-tier second generation local
						commercial bank with a proven track record of innovation and customer service excellence."
			/>

			<div className="mb-12 grid grid-cols-1 gap-5 sm:mb-16 sm:gap-6 md:mb-20 md:grid-cols-3 md:gap-7 lg:mb-24">
				{achievementsData.map((item, index) => (
					<AchievementCard
						key={index}
						icon={item.icon}
						year={item.year}
						title={item.title}
						description={item.description}
					/>
				))}
			</div>
		</div>
	);
};

type AchievementCardProps = {
	icon: string;
	year: string;
	title: string;
	description: string;
};

const AchievementCard = ({ icon, year, title, description }: AchievementCardProps) => {
	return (
		<div className="rounded-2xl border border-border p-5 text-center sm:p-6 md:p-8">
			<div className="mb-2 flex justify-center">
				<Image src={icon} alt={title} width={48} height={48} className="h-10 w-10 sm:h-12 sm:w-12" />
			</div>

			<p className="mb-2 text-sm text-[#212121] sm:mb-3 sm:text-base">{year}</p>

			<h3 className="mb-2 text-lg font-medium leading-snug text-[#212121] sm:text-xl md:text-2xl">{title}</h3>

			<p className="text-sm leading-relaxed text-[#212121] sm:text-base sm:leading-relaxed">{description}</p>
		</div>
	);
};
