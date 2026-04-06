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
		<div className="rounded-[40px] bg-[#FCFBE0] mt-[150px]">
			<div className=" px-6 py-[123px] sm:px-8 lg:px-[76px]">
				<SectionHeader
					className="mb-6 sm:mb-8 md:mb-10"
					title={
						<>
							Road to <span className="text-[#868211]">The Stage</span>
						</>
					}
					description="From sharing your hard-earned results to standing on the awards stage—here is how the journey looks."
				/>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{journey.map((step, index) => (
						<div key={index} className="rounded-[30px] bg-[#F6F4BC] px-10 py-8 text-gray-900">
							<p className="mb-8 text-5xl text-ink">{step.number}</p>
							<h3 className="mb-6 text-[32px] text-ink font-medium">{step.title}</h3>
							<p className="text-muted-ink leading-[24px]">{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
