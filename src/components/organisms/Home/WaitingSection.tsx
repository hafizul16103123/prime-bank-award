import { SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const registerBtnClass =
	"inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90 xl:gap-[5px] xl:px-10 xl:py-6 xl:text-base";

export const WaitingSection = () => {
	return (
		<div className="grid grid-cols-1 items-center gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:grid-cols-2 lg:gap-10 xl:gap-[52px] 2xl:gap-[52px]">
			<div className="order-2 min-w-0 lg:order-1">
				<div className="mb-3 inline-block rounded-full border border-[#005EB0] px-3 py-2 text-center xs:mb-4 xs:px-4 xs:py-2.5 sm:px-5 sm:py-[10px]">
					<span className="text-xs text-[#005EB0] xs:text-sm sm:text-base">How It Works</span>
				</div>
				<SectionHeader
					className="!text-left mb-3 xs:mb-4"
					title={
						<>
							The Stage is <br className="hidden sm:block" /> Waiting{" "}
							<span className="text-muted-ink">for You</span>
						</>
					}
					description="You’ve spent years mastering your subjects. Now, it’s time to take the stage and receive the nationwide recognition your hard work deserves in front of the country's academic leaders."
				/>

				<Link href="/registration" className={`${registerBtnClass} mt-4 sm:mt-5`}>
					Register Now <ArrowUpRight className="size-5 stroke-[2] xl:size-6" />
				</Link>
			</div>
			<div className="order-1 w-full min-w-0 lg:order-2">
				<Image
					src="/images/home_banner-2.png"
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
