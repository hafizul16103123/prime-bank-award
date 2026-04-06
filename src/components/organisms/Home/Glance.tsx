"use client";

import { SectionHeader } from "@/components/ui";

const stats = [
	{
		number: "2,500+",
		label: "Students Recognised Annually",
	},
	{
		number: "120+",
		label: "Schools Nationwide Annually",
	},
	{
		number: "25+",
		label: "Years of Excellence",
	},
];

export const Glance = () => {
	return (
		<div className="my-16 xs:my-20 sm:my-24 md:my-28 lg:my-32 xl:my-36 2xl:my-[150px]">
			<div className="mb-4 flex justify-center xs:mb-2 md:mb-5 xl:mb-6">
				<div className="rounded-full border border-[#005EB0]  text-center px-2.5 py-1 sm:px-5 sm:py-[10px]">
					<span className="text-xs text-[#005EB0] md:text-sm xl:text-base">
						Recognizing Brightest Students
					</span>
				</div>
			</div>

			<SectionHeader
				className="mb-6 sm:mb-8 md:mb-10"
				title={
					<>
						Recognition <span className="text-muted-ink">at a Glance</span>
					</>
				}
				description="Each year, thousands of students qualify for recognition. The awards programme helps celebrate excellence and support bright futures."
			/>

			<div className="grid grid-cols-1 gap-0 border-b-2 border-t-2 border-dashed border-gray-300 sm:grid-cols-3">
				{stats.map((stat, index) => (
					<div
						key={index}
						className={[
							"border-dashed border-gray-300 px-4 py-10 text-left xs:px-5 xs:py-12 sm:px-6 sm:py-14 md:px-8 md:py-16",
							index !== stats.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2" : "",
						].join(" ")}
					>
						<p className="mb-1 text-3xl font-medium text-ink xs:mb-2 xs:text-4xl sm:text-5xl">
							{stat.number}
						</p>
						<p className="text-sm leading-snug text-muted-ink sm:text-base">{stat.label}</p>
					</div>
				))}
			</div>
		</div>
	);
};
