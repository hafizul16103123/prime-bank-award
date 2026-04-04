import { Button } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
	return (
		<div className="relative w-full">
			<Image src="/images/hero_banner.png" alt="Hero Banner" width={1500} height={1500} className="w-full " />

			<div className="absolute bottom-0 right-0">
				<Button className="flex items-center gap-[5px] px-[120px] py-[38px]  font-medium bg-brand-blue text-white rounded-full hover:opacity-90 transition-opacity">
					Register Now
					<ArrowUpRight className="w-6 h-6" strokeWidth={3} />
				</Button>
			</div>
		</div>
	);
};
