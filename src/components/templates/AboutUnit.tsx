"use client";
import { AboutHeader, Awards, DigitalLeader, MissionVission } from "../organisms";
import { Container } from "../ui";

export const AboutUnit = () => {
	return (
		<Container>
			<AboutHeader />

			<DigitalLeader />

			<Awards />

			<MissionVission />
		</Container>
	);
};
