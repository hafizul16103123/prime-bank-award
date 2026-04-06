"use client";
import Image from "next/image";

export const AboutHeader = () => {
	return (
		<div className="flex items-center justify-center bg-background">
			<div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
				<Image
					src="/images/login_img.jpg"
					alt=""
					width={1500}
					height={1500}
					className="absolute inset-0 h-full w-full object-cover object-center"
				/>

				<div className="relative z-10 px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-14">
					<div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
						<div className="min-w-0 flex-1">
							<h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-primary-foreground sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-6xl xl:text-7xl xl:leading-[1.02]">
								About
								<br />
								Prime Bank PLC
							</h1>
							<p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-primary-foreground sm:mt-4 sm:text-base md:text-lg lg:text-xl lg:leading-snug">
								An innovative payment solution from Bangladesh&apos;s leading digital bank. Discover how
								we&apos;re revolutionizing banking for modern urban lifestyles.
							</p>
						</div>

						<div className="flex shrink-0 justify-center lg:justify-end">
							<Image
								src="/prime_logo.png"
								alt="Prime Bank"
								width={500}
								height={500}
								className="h-auto w-[min(200px,55vw)] sm:w-[220px] md:w-[260px] lg:w-[292px]"
							/>
						</div>
					</div>

					<div className="space-y-4 text-sm font-light leading-relaxed text-primary-foreground sm:space-y-5 sm:text-base md:text-lg lg:text-xl lg:leading-snug">
						<p>
							Since 1995, Prime Bank PLC has pioneered banking excellence by empowering Bangladesh&apos;s next
							generation through strategic education sponsorships and transformative community initiatives
							nationwide.
						</p>
						<p>
							From humble beginnings as a private commercial bank dedicated to serving the unbanked,
							we&apos;ve expanded to over 400 branches across Bangladesh — delivering innovative financial
							solutions to businesses and individuals while channeling billions into education, healthcare,
							and sustainable community development programs that create lasting impact.
						</p>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
						<div className="rounded-2xl bg-white/20 px-6 py-4 backdrop-blur-md sm:rounded-[24px] sm:px-8 sm:py-4 md:min-w-[160px] md:px-10 lg:px-12">
							<span className="block text-4xl font-medium text-primary-foreground sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-none">
								146
							</span>
							<span className="mt-1 block text-sm leading-snug text-primary-foreground sm:text-base">
								Branches Nationwide
							</span>
						</div>

						<div className="rounded-2xl bg-white/20 px-6 py-4 backdrop-blur-md sm:rounded-[24px] sm:px-8 sm:py-4 md:min-w-[160px] md:px-10 lg:px-12">
							<span className="block text-4xl font-medium text-primary-foreground sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-none">
								153
							</span>
							<span className="mt-1 block text-sm leading-snug text-primary-foreground sm:text-base">
								ATMs at 140 Locations
							</span>
						</div>

						<div className="rounded-2xl bg-white/20 px-6 py-4 backdrop-blur-md sm:rounded-[24px] sm:px-8 sm:py-4 md:min-w-[160px] md:px-10 lg:px-12">
							<span className="block text-4xl font-medium text-primary-foreground sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-none">
								29+
							</span>
							<span className="mt-1 block text-sm leading-snug text-primary-foreground sm:text-base">
								Years of Excellence
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
