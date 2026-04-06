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
		<div className="mt-[200px]">
			<div className="flex items-center justify-center">
				<span className=" border border-[#212121] rounded-full px-5 py-1.5 font-medium text-[#212121] mb-5 ">
					Recognition
				</span>
			</div>

			<SectionHeader
				className="mb-11"
				title={
					<>
						Awards & <span className="text-[#757575]">Recognition</span>
					</>
				}
				description="Established in 1995, Prime Bank has grown to become a top-tier second generation local
						commercial bank with a proven track record of innovation and customer service excellence."
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-24">
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
		<div className="border border-border rounded-2xl p-8 text-center">
			<div className="flex justify-center mb-2">
				<Image src={icon} alt={title} width={48} height={48} className="w-12" />
			</div>

			<p className="text-[#212121] mb-3">{year}</p>

			<h3 className="text-2xl font-medium text-[#212121] mb-2">{title}</h3>

			<p className="text-[#212121] leading-[24px]">{description}</p>
		</div>
	);
};
