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
		<div>
			<SectionHeader
				className="mb-11"
				title={
					<>
						Our Mission & <span className="text-[#757575]">Vision</span>
					</>
				}
				description="Established in 1995, Prime Bank has grown to become a top-tier second generation local commercial
					bank with a proven track record of innovation and customer service excellence."
			/>

			<div className="max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
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
		<div className={`${bgColor} rounded-2xl p-10 text-center`}>
			<div className="flex justify-center mb-[14px]">
				<Image src={icon} alt={title} width={48} height={48} className="w-12" />
			</div>

			<h3 className="text-[32px] font-medium text-[#212121] mb-2">{title}</h3>

			<p className="text-[#212121] leading-[24px]">{description}</p>
		</div>
	);
};
