import Image from "next/image";

export const SponsorBanner = () => {
	return (
		<div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl mt-[127px]">
			<Image
				src="/images/sponsor_banner.jpg"
				alt=""
				width={1500}
				height={1500}
				className="absolute inset-0 h-full w-full object-cover object-center"
			/>

			<div className="relative z-10 px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-14">
				<div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
					<Image
						src="/prime_logo.png"
						alt="Prime Bank"
						width={500}
						height={500}
						className="h-auto w-[min(200px,55vw)] sm:w-[220px] md:w-[260px] lg:w-[292px]"
					/>
				</div>

				<h4 className="text-[42px] leading-[45px] text-white mt-[270px]">
					Title Sponsor: 25th O <br /> & A Levels Awards
				</h4>
				<p className="leading-[24px] text-white w-[466px] mt-3">
					Prime Bank PLC proudly partners with The Daily Star as the Title Sponsor for the landmark 25th O & A
					Levels Awards – celebrating academic excellence among Bangladesh's brightest O-Level and A-Level
					students from English-medium schools nationwide.
				</p>
			</div>
		</div>
	);
};
