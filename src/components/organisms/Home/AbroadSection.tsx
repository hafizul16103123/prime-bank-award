import { Button, SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const images = ["/images/user3.png", "/images/user2.png", "/images/user1.png"];

export const AbroadSection = () => {
	return (
		<div className="mt-4 xs:mt-6 sm:mt-8">
			<div className="grid grid-cols-1 items-center gap-6 xs:gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-[34px]">
				<div className="rounded-3xl bg-[#E0EFFC] p-5 xs:p-6 xs:rounded-[40px] sm:p-8 sm:rounded-[44px] md:p-10 lg:col-span-8 lg:rounded-[50px] lg:p-12 xl:p-14 2xl:p-[60px]">
					<SectionHeader
						className="mb-6 !text-left sm:mb-8 md:mb-10"
						title={
							<>
								Apply for Higher <br className="hidden sm:block" />{" "}
								<span className="text-muted-ink">Study Abroad</span>
							</>
						}
						description="After the awards, many winners take the next step: higher education abroad. Prime Bank helps smooth the path."
					/>

					<Button
						type="button"
						className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white hover:opacity-90 xs:w-auto sm:mt-0 xl:gap-[5px] xl:px-10 xl:py-6 xl:text-base"
					>
						Explore Opportunities <ArrowUpRight className="size-5 stroke-[2] xl:size-6" />
					</Button>
				</div>

				<div className="flex justify-center lg:col-span-4 lg:justify-end">
					<Image
						src="/images/abroad_image.png"
						alt=""
						width={500}
						height={500}
						className="h-auto w-full max-w-[320px] object-contain xs:max-w-[380px] sm:max-w-[420px] md:max-w-[454px] lg:max-w-full lg:w-[454px]"
						sizes="(max-width: 1024px) 100vw, 454px"
					/>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 xs:mt-7 xs:gap-5 sm:grid-cols-3 sm:gap-5 md:gap-6">
				{images?.map((el) => (
					<Image
						key={el}
						src={el}
						alt=""
						width={500}
						height={500}
						className="h-auto w-full rounded-lg object-cover xs:rounded-xl sm:rounded-2xl"
						sizes="(max-width: 640px) 100vw, 33vw"
					/>
				))}
			</div>
		</div>
	);
};
