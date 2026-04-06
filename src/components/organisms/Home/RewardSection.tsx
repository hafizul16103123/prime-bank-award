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
		<div className="mt-16 xs:mt-20 sm:mt-28 md:mt-32 lg:mt-40 xl:mt-48 2xl:mt-[214px]">
			<div className="mb-4 flex justify-center xs:mb-5 sm:mb-6">
				<div className="rounded-full border border-[#005EB0] px-3 py-2 text-center xs:px-4 xs:py-2.5 sm:px-5 sm:py-[10px]">
					<span className="text-xs text-[#005EB0] xs:text-sm sm:text-base">Strive For Honor</span>
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

			<div className="grid grid-cols-1 gap-5 xs:gap-6 lg:grid-cols-12 lg:gap-6 xl:gap-6">
				<div className="relative order-1 w-full min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl lg:order-1 lg:col-span-8">
					<Image
						src="/images/reward_banner.png"
						alt=""
						width={1200}
						height={800}
						className="h-auto min-h-[200px] w-full object-cover xs:min-h-[240px] sm:min-h-[280px] md:min-h-0"
						sizes="(max-width: 1024px) 100vw, 66vw"
					/>

					<div className="absolute bottom-0 left-0 z-10 w-full px-3 py-5 xs:px-4 xs:py-6 sm:bottom-2 sm:px-5 sm:py-7 md:bottom-4 md:px-6 md:py-8 lg:bottom-6 lg:px-8 lg:py-9 xl:bottom-10 xl:px-10 xl:py-10 2xl:px-12">
						<h5 className="text-balance text-xl font-semibold leading-tight text-white xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl lg:leading-tight xl:text-[42px] xl:leading-[45px]">
							Your Bridge to <br className="hidden xs:block" /> Higher Study Abroad
						</h5>
						<p className="mt-2 max-w-full text-xs leading-relaxed text-white xs:mt-3 xs:text-sm sm:mr-0 sm:max-w-[95%] sm:text-sm md:mr-6 md:text-base lg:mr-10 lg:max-w-xl lg:leading-[24px]">
							Ready to take on the world? Award winners get direct, exclusive access to Prime Bank’s elite
							consultation partners, making your journey to international universities smooth and
							stress-free.
						</p>
					</div>
				</div>

				<div className="order-2 grid grid-cols-1 gap-4 xs:gap-5 sm:gap-6 lg:col-span-4">
					{benefits.map((benefit, index) => (
						<div
							key={index}
							className="rounded-2xl border border-tartiary p-5 xs:p-6 sm:rounded-3xl sm:p-8 md:p-9 lg:p-10"
						>
							<Image src={benefit?.icon} alt="" width={100} height={100} className="h-auto w-14 xs:w-16 sm:w-[72px]" />

							<h3 className="mb-2 mt-3 text-lg font-medium text-ink xs:mb-3 xs:mt-4 xs:text-xl sm:text-2xl md:mb-4 md:text-[26px] lg:text-[28px]">
								{benefit.title}
							</h3>
							<p className="text-sm leading-relaxed text-ink sm:text-base sm:leading-[24px]">{benefit.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
