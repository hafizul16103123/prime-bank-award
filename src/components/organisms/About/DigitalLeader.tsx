"use client";

import { SectionHeader } from "@/components/ui";
import Image from "next/image";

export const DigitalLeader = () => {
	return (
		<div className="mt-[110px]">
			<SectionHeader
				className="mb-[30px]"
				title={
					<>
						Bangladesh&apos;s <span className="text-[#757575]">Digital</span>
						<br />
						<span className="text-[#757575]">Banking Leader</span>
					</>
				}
				description="Established in 1995, Prime Bank has grown to become a top-tier second generation local commercial bank with a proven track record of innovation and customer service excellence."
			/>

			<div className="border-[2px] border-tartiary rounded-[50px] py-[74px] px-[90px]">
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="pr-20 pb-14 md:border-r-2 border-dashed border-tartiary">
						<div className="mb-1">
							<Image src="/images/icons/blur_on.png" alt="" width={200} height={200} className="w-16" />
						</div>
						<h3 className="text-[28px] font-medium text-[#212121] mb-4">Our Heritage</h3>
						<p className="text-[#212121] leading-[24px]">
							Founded in 1995 and incorporated under the Companies Act of 1994, Prime Bank has established
							itself as a cornerstone of Bangladesh's financial system. Headquartered in Gulshan Avenue,
							Dhaka's bustling financial hub, we serve clients across the entire nation with dedication
							and innovation.
						</p>
					</div>

					<div className="pl-20 border-t-2 md:border-t-0 border-dashed border-tartiary">
						<div className="mb-1">
							<Image src="/images/icons/asterisk.png" alt="" width={200} height={200} className="w-16" />
						</div>
						<h3 className="text-[28px] font-medium text-[#212121] mb-4">Our Expertise</h3>
						<p className="text-[#212121] leading-[24px]">
							Prime Bank is renowned for its exceptional expertise in Corporate and Institutional Banking.
							We combine deep market knowledge with innovative solutions to serve Bangladesh's most
							demanding corporate clients. Our success is built on understanding your business needs.
						</p>
					</div>
				</div>

				<div className="border-t-2 border-dashed border-tartiary" />

				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="pt-10 pr-20 md:border-r-2 border-dashed border-tartiary">
						<div className="mb-1">
							<Image src="/images/icons/crown.png" alt="" width={200} height={200} className="w-16" />
						</div>
						<h3 className="text-[28px] font-medium text-[#212121] mb-4">Digital Leadership</h3>
						<p className="text-[#212121] leading-[24px]">
							Prime Bank has pioneered digital banking services in Bangladesh. We were awarded "Best
							Digital Bank in Bangladesh 2020" by Asiamoney, recognizing our commitment to
							technology-driven innovation that makes banking accessible and convenient for everyone.
						</p>
					</div>

					<div className="pl-20 pt-10 border-t-2 md:border-t-0 border-dashed border-tartiary">
						<div className="mb-1">
							<Image
								src="/images/icons/globe_book.png"
								alt=""
								width={200}
								height={200}
								className="w-16"
							/>
						</div>
						<h3 className="text-[28px] font-medium text-[#212121] mb-4">Global Recognition</h3>
						<p className="text-[#212121] leading-[24px]">
							Global Finance, a leading North American financial publication, recognized Prime Bank as the
							"Best Bank in Bangladesh 2020." This honor reflects our commitment to excellence,
							innovation, and customer satisfaction across all banking services.
						</p>
					</div>
				</div>
			</div>

			<p className="text-[#212121] max-w-[880px] mx-auto leading-[24px] text-center mt-[42px]">
				In 2014, Prime Bank initiated a comprehensive 'Business Model Restructuring and Centralization' project
				to enhance operational efficiency, streamline processes, and better serve our evolving customer base
				with modern banking solutions.
			</p>
		</div>
	);
};
