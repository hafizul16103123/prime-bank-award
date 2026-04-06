import { Button, SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const GlobalJourney = () => {
	return (
		<div className="grid grid-cols-2 items-center gap-[52px] my-[150px]">
			<div>
				<div className="rounded-full border-[1px] border-[#005EB0] px-5 py-[10px] text-center mb-4 inline-block">
					<span className=" text-[#005EB0]">How It Works</span>
				</div>
				<SectionHeader
					className="!text-left mb-4"
					title={
						<>
							Your Global <br /> Journey <span className="text-muted-ink">Starts Here</span>
						</>
					}
					description="O & A Level success is your first major milestone. We provide the expert guidance and elite partnerships you need to bridge the gap between top grades and world-class universities."
				/>

				<Link href="/registration">
					<Button
						type="button"
						className="flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white hover:opacity-90 xl:gap-[5px] xl:px-10 xl:py-6 xl:text-base"
					>
						Register Now <ArrowUpRight className="size-5 stroke-[2] xl:size-6" />
					</Button>
				</Link>
			</div>
			<div>
				<Image
					src="/images/journey_banner.png"
					alt=""
					width={1000}
					height={1000}
					className="w-[706px] h-auto"
				/>
			</div>
		</div>
	);
};
