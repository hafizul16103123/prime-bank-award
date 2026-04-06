import Image from "next/image";
import { Glance, HeroSection, RewardSection, RoadToStage, SponsorBanner, WaitingSection } from "../organisms";
import { Container } from "../ui";

export const HomeUnit = () => {
	return (
		<Container>
			<HeroSection />

			<Image src="/images/award.png" alt="Award Image" width={1500} height={1500} className="w-full -mt-1" />

			<Glance />

			<WaitingSection />

			<RoadToStage />

			<SponsorBanner />

			<RewardSection />
		</Container>
	);
};
