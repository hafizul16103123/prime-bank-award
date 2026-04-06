"use client";

import { SectionHeader } from "@/components/ui";
import Image from "next/image";

export const DigitalLeader = () => {
	return (
		<div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28">
			<SectionHeader
				className="mb-6 sm:mb-8 md:mb-10"
				title={
					<>
						Bangladesh&apos;s <span className="text-[#757575]">Digital</span>
						<br className="hidden sm:block" />
						<span className="text-[#757575]">Banking Leader</span>
					</>
				}
				description="Established in 1995, Prime Bank has grown to become a top-tier second generation local commercial bank with a proven track record of innovation and customer service excellence."
			/>

			<div className="rounded-3xl border-2 border-tartiary px-4 py-10 sm:px-6 sm:py-12 md:rounded-[40px] md:px-8 md:py-14 lg:rounded-[50px] lg:px-12 lg:py-16 xl:px-[90px] xl:py-[74px]">
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="pb-10 md:border-r-2 md:border-dashed md:border-tartiary md:pb-14 md:pr-8 lg:pr-20">
						<div className="mb-1">
							<Image
								src="/images/icons/blur_on.png"
								alt=""
								width={200}
								height={200}
								className="w-12 sm:w-14 md:w-16"
							/>
						</div>
						<h3 className="mb-3 text-xl font-medium text-[#212121] sm:mb-4 sm:text-2xl md:text-[26px] lg:text-[28px]">
							Our Heritage
						</h3>
						<p className="text-sm leading-relaxed text-[#212121] sm:text-base md:leading-[26px]">
							Founded in 1995 and incorporated under the Companies Act of 1994, Prime Bank has established
							itself as a cornerstone of Bangladesh&apos;s financial system. Headquartered in Gulshan
							Avenue, Dhaka&apos;s bustling financial hub, we serve clients across the entire nation with
							dedication and innovation.
						</p>
					</div>

					<div className="border-t-2 border-dashed border-tartiary pt-10 md:border-t-0 md:pl-8 md:pt-0 lg:pl-20">
						<div className="mb-1">
							<Image
								src="/images/icons/asterisk.png"
								alt=""
								width={200}
								height={200}
								className="w-12 sm:w-14 md:w-16"
							/>
						</div>
						<h3 className="mb-3 text-xl font-medium text-[#212121] sm:mb-4 sm:text-2xl md:text-[26px] lg:text-[28px]">
							Our Expertise
						</h3>
						<p className="text-sm leading-relaxed text-[#212121] sm:text-base md:leading-[26px]">
							Prime Bank is renowned for its exceptional expertise in Corporate and Institutional Banking.
							We combine deep market knowledge with innovative solutions to serve Bangladesh&apos;s most
							demanding corporate clients. Our success is built on understanding your business needs.
						</p>
					</div>
				</div>

				<div className="my-8 border-t-2 border-dashed border-tartiary sm:my-10 md:my-0" />

				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="pb-10 md:pb-0 md:pt-10 md:border-r-2 md:border-dashed md:border-tartiary md:pr-8 lg:pr-20">
						<div className="mb-1">
							<Image
								src="/images/icons/crown.png"
								alt=""
								width={200}
								height={200}
								className="w-12 sm:w-14 md:w-16"
							/>
						</div>
						<h3 className="mb-3 text-xl font-medium text-[#212121] sm:mb-4 sm:text-2xl md:text-[26px] lg:text-[28px]">
							Digital Leadership
						</h3>
						<p className="text-sm leading-relaxed text-[#212121] sm:text-base md:leading-[26px]">
							Prime Bank has pioneered digital banking services in Bangladesh. We were awarded &quot;Best
							Digital Bank in Bangladesh 2020&quot; by Asiamoney, recognizing our commitment to
							technology-driven innovation that makes banking accessible and convenient for everyone.
						</p>
					</div>

					<div className="border-t-2 border-dashed border-tartiary pt-10 md:border-t-0 md:pl-8 lg:pl-20">
						<div className="mb-1">
							<Image
								src="/images/icons/globe_book.png"
								alt=""
								width={200}
								height={200}
								className="w-12 sm:w-14 md:w-16"
							/>
						</div>
						<h3 className="mb-3 text-xl font-medium text-[#212121] sm:mb-4 sm:text-2xl md:text-[26px] lg:text-[28px]">
							Global Recognition
						</h3>
						<p className="text-sm leading-relaxed text-[#212121] sm:text-base md:leading-[26px]">
							Global Finance, a leading North American financial publication, recognized Prime Bank as the
							&quot;Best Bank in Bangladesh 2020.&quot; This honor reflects our commitment to excellence,
							innovation, and customer satisfaction across all banking services.
						</p>
					</div>
				</div>
			</div>

			<p className="mx-auto mt-8 max-w-[880px] px-1 text-center text-sm leading-relaxed text-[#212121] sm:mt-10 sm:text-base md:mt-12 md:text-lg md:leading-relaxed">
				In 2014, Prime Bank initiated a comprehensive &apos;Business Model Restructuring and
				Centralization&apos; project to enhance operational efficiency, streamline processes, and better serve
				our evolving customer base with modern banking solutions.
			</p>
		</div>
	);
};
