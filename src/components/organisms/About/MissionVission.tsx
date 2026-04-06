import { SectionHeader } from "@/components/ui";
import Image from "next/image";

export const visionMissionData = [
	{
		bgColor: "bg-[#e0effc]",
		icon: "/images/icons/undereye.png",
		title: "Our Vision",
		description:
			"To be the best Private Commercial Bank in Bangladesh in terms of efficiency, capital adequacy, asset quality, sound management and profitability having strong liquidity.",
	},
	{
		bgColor: "bg-[#eafce0]",
		icon: "/images/icons/target.png",
		title: "Our Mission",
		description:
			"To build Prime Bank PLC. into an efficient, market-driven, customer focused institution with good corporate governance structure. Continuous improvement of our business policies, procedure and efficiency through integration of technology at all levels.",
	},
];

export const MissionVission = () => {
	return (
		<div className="mt-4 sm:mt-6">
			<SectionHeader
				className="mb-8 sm:mb-10 md:mb-11"
				title={
					<>
						Our Mission & <span className="text-[#757575]">Vision</span>
					</>
				}
				description="Established in 1995, Prime Bank has grown to become a top-tier second generation local commercial
					bank with a proven track record of innovation and customer service excellence."
			/>

			<div className="mx-auto mb-12 grid max-w-[820px] grid-cols-1 gap-4 sm:mb-14 sm:gap-5 md:grid-cols-2 md:mb-16">
				{visionMissionData.map((item, index) => (
					<VisionMissionCard
						key={index}
						bgColor={item.bgColor}
						icon={item.icon}
						title={item.title}
						description={item.description}
					/>
				))}
			</div>
		</div>
	);
};

type VisionMissionCardProps = {
	bgColor: string;
	icon: string;
	title: string;
	description: string;
};

const VisionMissionCard = ({ bgColor, icon, title, description }: VisionMissionCardProps) => {
	return (
		<div className={`${bgColor} rounded-2xl p-6 text-center sm:p-8 md:p-10`}>
			<div className="mb-3 flex justify-center sm:mb-[14px]">
				<Image src={icon} alt={title} width={48} height={48} className="h-10 w-10 sm:h-12 sm:w-12" />
			</div>

			<h3 className="mb-2 text-2xl font-medium leading-tight text-[#212121] sm:text-[28px] md:text-[32px]">
				{title}
			</h3>

			<p className="text-sm leading-relaxed text-[#212121] sm:text-base sm:leading-relaxed">{description}</p>
		</div>
	);
};
