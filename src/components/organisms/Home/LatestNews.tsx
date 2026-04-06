import { SectionHeader } from "@/components/ui";

export const LatestNews = () => {
	const newsItems = [
		{
			title: "Registration is Now Open for 2026",
			description:
				"The O & A Level Awards 2026 registration window is live. Students can now submit their applications online.",
			date: "Posted on 5 April 2026",
		},
		{
			title: "Key Dates for 2026 Sessions",
			description:
				"Check the updated exam and results schedule for O-Level and A-Level so you can plan your application accordingly.",
			date: "Posted on 5 April 2026",
		},
	];

	return (
		<div className="rounded-[40px] bg-[#EAFCE0] px-8 py-16 sm:px-12 lg:px-16 mt-[150px]">
			<div className="mb-6 flex justify-center">
				<div className="rounded-full bg-[#D6F1C7] border-[1px] border-[#449850] px-5 py-[10px] text-center  inline-block">
					<span className=" text-[#296E02]">Highlights</span>
				</div>
			</div>

			<SectionHeader
				className="mb-6 sm:mb-8 md:mb-10"
				title={
					<>
						Latest News <span className="text-[#296E02]">& Updates </span>
					</>
				}
				description="Stay informed about registration deadlines, winners, ceremonies, and important announcements."
			/>
			{/* News Cards */}
			<div className="grid grid-cols-1  sm:grid-cols-2 gap-9 ">
				{newsItems.map((item, index) => (
					<div key={index} className="bg-[#D6F1C7] rounded-[30px] px-10 py-[34px]">
						<h3 className="mb-6 text-2xl font-medium text-ink">{item.title}</h3>
						<p className="mb-6 text-ink leading-[24px]">{item.description}</p>
						<p className="text-sm text-muted-ink">{item.date}</p>
					</div>
				))}
			</div>
		</div>
	);
};
