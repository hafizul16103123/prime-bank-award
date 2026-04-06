import { Button } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
	return (
		<div className="relative w-full">
			<Image src="/images/hero_banner.png" alt="Hero Banner" width={1500} height={1500} className="w-full " />

			<div className="absolute bottom-10 left-10 w-[60%] bg-white/20 p-12 rounded-[33px] backdrop-blur-md">
				<h1 className="text-white text-3xl  leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight md:text-5xl md:leading-[1.1] lg:text-6xl  xl:leading-[1.08]">
					Saluting the Nation <br /> Builders of Tomorrow
				</h1>

				<p className="leadeing-[24px] text-white w-[55%]">
					Prime Bank and The Daily Star, proudly recognizing outstanding O‑Level and A‑Level students across
					Bangladesh. Register, get recognized, and unlock pathways to study abroad.
				</p>
			</div>

			<div className="absolute bottom-0 right-0">
				<Button className="flex items-center gap-[5px] px-[120px] py-[38px]  font-medium bg-brand-blue text-white rounded-full hover:opacity-90 transition-opacity">
					Register Now
					<ArrowUpRight className="w-6 h-6" strokeWidth={3} />
				</Button>
			</div>
		</div>
	);
};
