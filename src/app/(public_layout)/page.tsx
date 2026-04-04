import { HomeUnit } from "@/components/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: `Dashboard | ${process.env.SITE_NAME}`,
		default: `Dashboard | ${process.env.SITE_NAME}`,
	},
};
const Home = async () => {
	return <HomeUnit />;
};

export default Home;
