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

			<div className="">
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
