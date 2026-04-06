import { SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const registerBtnClass =
	"inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90 xl:gap-[5px] xl:px-10 xl:py-6 xl:text-base";

export const GlobalJourney = () => {
	return (
		<div className="my-16 grid grid-cols-1 items-center gap-8 xs:my-20 xs:gap-10 sm:my-24 sm:gap-12 md:my-28 md:gap-14 lg:my-32 lg:grid-cols-2 lg:gap-10 xl:my-36 xl:gap-[52px] 2xl:my-[150px] 2xl:gap-[52px]">
			<div className="order-2 min-w-0 lg:order-1">
				<div className="mb-3 inline-block rounded-full border border-[#005EB0] px-3 py-2 text-center xs:mb-4 xs:px-4 xs:py-2.5 sm:px-5 sm:py-[10px]">
					<span className="text-xs text-[#005EB0] xs:text-sm sm:text-base">How It Works</span>
				</div>
				<SectionHeader
					className="!text-left mb-3 xs:mb-4"
					title={
						<>
							Your Global <br className="hidden sm:block" /> Journey{" "}
							<span className="text-muted-ink">Starts Here</span>
						</>
					}
					description="O & A Level success is your first major milestone. We provide the expert guidance and elite partnerships you need to bridge the gap between top grades and world-class universities."
				/>

				<Link href="/registration" className={`${registerBtnClass} mt-4 sm:mt-5`}>
					Register Now <ArrowUpRight className="size-5 stroke-[2] xl:size-6" />
				</Link>
			</div>
			<div className="order-1 w-full min-w-0 lg:order-2">
				<Image
					src="/images/journey_banner.png"
					alt=""
					width={1000}
					height={1000}
					className="mx-auto h-auto w-full max-w-[706px] rounded-xl object-contain sm:rounded-2xl lg:mx-0 lg:ml-auto lg:rounded-none"
					sizes="(max-width: 1024px) 100vw, 706px"
				/>
			</div>
		</div>
	);
};
