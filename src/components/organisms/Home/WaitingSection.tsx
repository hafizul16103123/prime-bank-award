import { Button, SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const WaitingSection = () => {
	return (
		<div className="grid grid-cols-2 items-center gap-[52px]">
			<div>
				<div className="rounded-full border-[1px] border-[#005EB0] px-5 py-[10px] text-center mb-4 inline-block">
					<span className=" text-[#005EB0]">How It Works</span>
				</div>
				<SectionHeader
					className="!text-left mb-4"
					title={
						<>
							The Stage is <br /> Waiting <span className="text-muted-ink">for You</span>
						</>
					}
					description="You’ve spent years mastering your subjects. Now, it’s time to take the stage and receive the nationwide recognition your hard work deserves in front of the country's academic leaders."
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
				<Image src="/images/home_banner-2.png" alt="" width={1000} height={1000} className="w-[706px] h-auto" />
			</div>
		</div>
	);
};
