"use client";
import Image from "next/image";

export const AboutHeader = () => {
	return (
		<div className=" flex items-center justify-center bg-background ">
			<div className="relative w-full  rounded-3xl overflow-hidden">
				<Image
					src="/images/login_img.jpg"
					alt=""
					width={1500}
					height={1500}
					className="absolute inset-0 w-full h-full object-cover"
				/>

				<div className="relative z-10 px-10 py-5 md:px-[60px] md:py-12">
					<div className="flex items-start justify-between mb-6">
						<div>
							<h1 className="text-[70px] leading-[69px] text-primary-foreground ">
								About
								<br />
								Prime Bank PLC
							</h1>
							<p className="text-primary-foreground font-light text-xl mt-3 leading-[25px] w-[650px]">
								An innovative payment solution from Bangladesh's leading digital bank. Discover how
								we're revolutionizing banking for modern urban lifestyles.
							</p>
						</div>

						<div className="flex items-center gap-2 shrink-0">
							<Image src="/prime_logo.png" alt="" width={500} height={500} className="w-[292px] h-auto" />
						</div>
					</div>

					<p className="text-primary-foreground font-light text-xl mt-5 leading-[25px]">
						Since 1995, Prime Bank PLC has pioneered banking excellence by empowering Bangladesh's next
						generation through strategic education sponsorships and transformative community initiatives
						nationwide.
						<br />
						<br />
						From humble beginnings as a private commercial bank dedicated to serving the unbanked, we've
						expanded to over 400 branches across Bangladesh — delivering innovative financial solutions to
						businesses and individuals while channeling billions into education, healthcare, and sustainable
						community development programs that create lasting impact.
					</p>

					{/* Stats Cards */}
					<div className="flex flex-wrap gap-4 mt-6">
						<div className="bg-white/20 backdrop-blur-md  rounded-[24px] px-12 py-4 min-w-[160px]">
							<span className="text-[64px] font-medium text-primary-foreground block">146</span>
							<span className="text-primary-foreground   block">Branches Nationwide</span>
						</div>

						<div className="bg-white/20 backdrop-blur-md  rounded-[24px] px-12 py-4 min-w-[160px]">
							<span className="text-[64px] font-medium text-primary-foreground block">153</span>
							<span className="text-primary-foreground   block">ATMs at 140 Locations</span>
						</div>

						<div className="bg-white/20 backdrop-blur-md  rounded-[24px] px-12 py-4 min-w-[160px]">
							<span className="text-[64px] font-medium text-primary-foreground block">29+</span>
							<span className="text-primary-foreground   block">Years of Excellence</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
