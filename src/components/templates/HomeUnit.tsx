import Image from "next/image";
import {
	AbroadSection,
	Glance,
	GlobalJourney,
	HeroSection,
	LatestNews,
	RewardSection,
	RoadToStage,
	SponsorBanner,
	WaitingSection,
} from "../organisms";
import { Container } from "../ui";

export const HomeUnit = () => {
	return (
		<Container>
			<HeroSection />

			<div className="px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
				<Image
					src="/images/award.png"
					alt="Award"
					width={1500}
					height={1500}
					className="-mt-1 h-auto w-full max-w-full object-contain object-center"
					sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1440px"
					priority
				/>

				<Glance />

				<WaitingSection />

				<RoadToStage />

				<SponsorBanner />

				<RewardSection />

				<GlobalJourney />

				<AbroadSection />

				<LatestNews />
			</div>
		</Container>
	);
};
