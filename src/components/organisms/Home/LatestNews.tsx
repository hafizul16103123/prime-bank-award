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
		<div className="mt-16 rounded-3xl bg-[#EAFCE0] px-4 py-10 xs:mt-20 xs:rounded-[36px] xs:px-5 xs:py-12 sm:mt-24 sm:px-6 sm:py-14 md:mt-28 md:rounded-[40px] md:px-8 md:py-14 lg:mt-32 lg:px-10 lg:py-16 xl:mt-36 xl:px-12 2xl:mt-[150px] 2xl:px-16">
			<div className="mb-4 flex justify-center xs:mb-5 sm:mb-6">
				<div className="inline-block rounded-full border border-[#449850] bg-[#D6F1C7] px-3 py-2 text-center xs:px-4 xs:py-2.5 sm:px-5 sm:py-[10px]">
					<span className="text-xs text-[#296E02] xs:text-sm sm:text-base">Highlights</span>
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
			<div className="grid grid-cols-1 gap-6 xs:gap-7 sm:grid-cols-2 sm:gap-8 md:gap-9">
				{newsItems.map((item, index) => (
					<div
						key={index}
						className="rounded-2xl bg-[#D6F1C7] px-5 py-6 xs:rounded-[26px] xs:px-6 xs:py-7 sm:rounded-[28px] sm:px-8 sm:py-8 md:rounded-[30px] md:px-9 md:py-[30px] lg:px-10 lg:py-[34px]"
					>
						<h3 className="mb-3 text-lg font-medium leading-snug text-ink xs:mb-4 xs:text-xl sm:mb-5 sm:text-2xl md:mb-6">
							{item.title}
						</h3>
						<p className="mb-4 text-sm leading-relaxed text-ink xs:mb-5 xs:text-base sm:mb-6 sm:leading-[24px]">
							{item.description}
						</p>
						<p className="text-xs text-muted-ink sm:text-sm">{item.date}</p>
					</div>
				))}
			</div>
		</div>
	);
};
