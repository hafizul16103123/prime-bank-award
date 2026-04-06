import Image from "next/image";

export const SponsorBanner = () => {
	return (
		<div className="relative mt-16 w-full overflow-hidden rounded-xl xs:mt-20 sm:mt-24 sm:rounded-2xl md:mt-28 md:rounded-3xl lg:mt-32 xl:mt-36 2xl:mt-[127px]">
			<Image
				src="/images/sponsor_banner.jpg"
				alt=""
				width={1500}
				height={1500}
				className="absolute inset-0 h-full w-full object-cover object-center"
				sizes="100vw"
			/>

			<div
				className={[
					"relative z-10 flex min-h-[min(52vh,420px)] flex-col px-4 py-8 xs:min-h-[min(48vh,400px)] xs:px-5 xs:py-9",
					"sm:min-h-[min(46vh,440px)] sm:px-6 sm:py-10 md:min-h-[min(44vh,480px)] md:px-8 md:py-12",
					"lg:min-h-[min(42vh,520px)] lg:px-10 lg:py-14 xl:min-h-[560px] xl:px-12 xl:py-16 2xl:min-h-[600px] 2xl:px-14",
				].join(" ")}
			>
				<div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between lg:mb-10">
					<Image
						src="/prime_logo.png"
						alt="Prime Bank"
						width={500}
						height={500}
						className="h-auto w-[min(180px,48vw)] xs:w-[min(200px,50vw)] sm:w-[220px] md:w-[260px] lg:w-[292px]"
					/>
				</div>

				<div className="mt-auto flex flex-col pt-6 sm:pt-10 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28">
					<h4 className="text-balance text-2xl font-semibold leading-tight text-white xs:text-3xl sm:text-3xl md:text-4xl md:leading-tight lg:text-[38px] lg:leading-[1.1] xl:text-[42px] xl:leading-[45px]">
						Title Sponsor: 25th O <br className="hidden xs:block" /> & A Levels Awards
					</h4>
					<p className="mt-3 max-w-full text-sm leading-relaxed text-white xs:mt-4 xs:text-base sm:max-w-xl sm:text-base md:max-w-md md:text-base lg:max-w-[466px] lg:text-base xl:leading-[24px]">
						Prime Bank PLC proudly partners with The Daily Star as the Title Sponsor for the landmark 25th O &
						A Levels Awards – celebrating academic excellence among Bangladesh&apos;s brightest O-Level and
						A-Level students from English-medium schools nationwide.
					</p>
				</div>
			</div>
		</div>
	);
};
