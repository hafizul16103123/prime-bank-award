import { Button, SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const images = ["/images/user3.png", "/images/user2.png", "/images/user1.png"];

export const AbroadSection = () => {
	return (
		<div>
			<div className="grid grid-cols-12 items-center gap-[34px]">
				<div className="rounded-[50px] bg-[#E0EFFC] p-[60px] col-span-8">
					<SectionHeader
						className="mb-6 sm:mb-8 md:mb-10 !text-left"
						title={
							<>
								Apply for Higher <br /> <span className="text-muted-ink">Study Abroad</span>
							</>
						}
						description="After the awards, many winners take the next step: higher education abroad. Prime Bank helps smooth the path."
					/>

					<Button
						type="button"
						className="flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white hover:opacity-90 xl:gap-[5px] xl:px-10 xl:py-6 xl:text-base"
					>
						Explore Opportunities <ArrowUpRight className="size-5 stroke-[2] xl:size-6" />
					</Button>
				</div>

				<div className="col-span-4">
					<Image
						src="/images/abroad_image.png"
						alt=""
						width={500}
						height={500}
						className="w-[454px] h-auto"
					/>
				</div>
			</div>

			<div className="grid grid-cols-3 mt-7 gap-6">
				{images?.map((el) => (
					<Image key={el} src={el} alt="" width={500} height={500} className="w-full h-auto" />
				))}
			</div>
		</div>
	);
};
