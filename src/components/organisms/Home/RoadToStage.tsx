import { SectionHeader } from "@/components/ui";

export const RoadToStage = () => {
	const journey = [
		{
			number: "1",
			title: "Register",
			description: "Create your profile and upload your O/A Level results. It only takes a few minutes!",
		},
		{
			number: "2",
			title: "Get Verified",
			description: "Your school will give the green light to make sure your grades are 100% correct.",
		},
		{
			number: "3",
			title: "Get Your Invite",
			description: "Once verified, keep an eye on your inbox! We'll send out official invites to our awardees.",
		},
		{
			number: "4",
			title: "Take the Stage",
			description: "Join your peers at our grand ceremony to receive your award and celebrate.",
		},
	];
	return (
		<div className="mt-16 rounded-3xl bg-[#FCFBE0] xs:mt-20 sm:mt-24 md:mt-28 md:rounded-[36px] lg:mt-32 lg:rounded-[40px] xl:mt-36 2xl:mt-[150px]">
			<div className="px-4 py-12 xs:px-5 xs:py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-28 2xl:px-[76px] 2xl:py-[123px]">
				<SectionHeader
					className="mb-6 sm:mb-8 md:mb-10"
					title={
						<>
							Road to <span className="text-[#868211]">The Stage</span>
						</>
					}
					description="From sharing your hard-earned results to standing on the awards stage—here is how the journey looks."
				/>

				<div className="grid grid-cols-1 gap-4 xs:gap-5 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4 lg:gap-5 xl:gap-6">
					{journey.map((step, index) => (
						<div
							key={index}
							className="rounded-2xl bg-[#F6F4BC] px-5 py-6 text-gray-900 xs:rounded-[26px] xs:px-6 xs:py-7 sm:px-8 sm:py-8 md:rounded-[30px] md:px-9 lg:px-10"
						>
							<p className="mb-4 text-4xl text-ink xs:mb-5 xs:text-5xl sm:mb-6 sm:text-5xl md:mb-8 md:text-5xl">
								{step.number}
							</p>
							<h3 className="mb-3 text-xl font-medium text-ink xs:mb-4 xs:text-2xl sm:mb-5 sm:text-[28px] md:mb-6 md:text-[30px] lg:text-[32px]">
								{step.title}
							</h3>
							<p className="text-sm leading-relaxed text-muted-ink sm:text-base sm:leading-[24px]">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
