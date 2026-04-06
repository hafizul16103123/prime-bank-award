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
		<div className="my-[150px]">
			<div className="mb-6 flex justify-center">
				<div className="rounded-full border-[1px] border-[#005EB0] px-5 py-[10px] text-center">
					<span className=" text-[#005EB0]">Recognizing Brightest Students</span>
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

			<div className="grid grid-cols-1 gap-0 sm:grid-cols-3 border-t-2 border-b-2 border-dashed border-gray-300">
				{stats.map((stat, index) => (
					<div
						key={index}
						className={`py-16 px-8 text-left ${index !== stats.length - 1 ? "border-r-2 border-dashed border-gray-300" : ""}`}
					>
						<p className="mb-2 text-5xl font-medium text-ink">{stat.number}</p>
						<p className="text-muted-ink">{stat.label}</p>
					</div>
				))}
			</div>
		</div>
	);
};
