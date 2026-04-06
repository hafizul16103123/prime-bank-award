import { SectionHeader } from "@/components/ui";
import Image from "next/image";

const benefits = [
	{
		icon: "/images/icons/reward2.png",
		title: "Global Prestige",
		description:
			"Stand out to recruiters and top-tier universities with a certificate that proves your excellence.",
	},
	{
		icon: "/images/icons/reward1.png",
		title: "The Early Access",
		description:
			"Get early access to scholarship news, career workshops, and leadership events hosted by our partners.",
	},
];

export const RewardSection = () => {
	return (
		<div className="mt-[214px]">
			<div className="mb-6 flex justify-center">
				<div className="rounded-full border-[1px] border-[#005EB0] px-5 py-[10px] text-center">
					<span className=" text-[#005EB0]">Strive For Honor</span>
				</div>
			</div>

			<SectionHeader
				className="mb-6 sm:mb-8 md:mb-10"
				title={
					<>
						Reward Your <span className="text-muted-ink">Hard Work</span>
					</>
				}
				description="Your hard work deserves a global platform. We don't just give you a trophy; we open doors to your future."
			/>

			<div className="grid grid-cols-12 gap-6">
				<div className="relative w-full overflow-hidden col-span-8">
					<Image src="/images/reward_banner.png" alt="" width={500} height={500} className="w-full h-auto" />

					<div className="absolute bottom-2 sm:bottom-4 md:bottom-8 lg:bottom-10 left-0 w-full z-10 px-4 py-6 sm:px-6 md:px-10 lg:px-12">
						<h5 className="text-white text-[42px] leading-[45px]">
							Your Bridge to <br /> Higher Study Abroad
						</h5>
						<p className="leading-[24px] text-white mr-10">
							Ready to take on the world? Award winners get direct, exclusive access to Prime Bank’s elite
							consultation partners, making your journey to international universities smooth and
							stress-free.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 col-span-4">
					{benefits.map((benefit, index) => (
						<div key={index} className="rounded-3xl border-[1px] border-tartiary p-10">
							<Image src={benefit?.icon} alt="" width={100} height={100} />

							<h3 className="mb-4 text-[28px] font-medium text-ink mt-4">{benefit.title}</h3>
							<p className=" text-ink leading-[24px]">{benefit.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
