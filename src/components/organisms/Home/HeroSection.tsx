import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
	return (
		<div className="relative w-full overflow-hidden">
			<Image
				src="/images/hero_banner.png"
				alt="Hero Banner"
				width={1500}
				height={1500}
				className="h-auto  w-full object-cover object-center "
				sizes="100vw"
				priority
			/>

			<div
				className={[
					"absolute left-3 right-3 rounded-2xl bg-white/20 p-4 backdrop-blur-md xs:left-4 xs:right-4 xs:rounded-[16px] max-w-[min(60%,240px)] xs:p-3",
					"bottom-4 xs:bottom-4 sm:bottom-36 sm:left-5 sm:right-auto sm:max-w-[min(92%,640px)] sm:p-6 sm:rounded-[28px]",
					"md:bottom-8 md:left-7 md:max-w-[min(60%,720px)] md:p-8 md:rounded-[30px]",
					"lg:bottom-9 lg:left-9 lg:w-[60%] lg:max-w-none lg:p-10 lg:rounded-[33px]",
					"xl:bottom-10 xl:left-10 xl:p-12",
				].join(" ")}
			>
				<h1 className="text-balance text-xl font-semibold leading-tight tracking-tight text-white xs:text-xl sm:text-4xl sm:leading-tight md:text-4xl md:leading-[1.1] lg:text-4xl xl:text-6xl xl:leading-[1.08]">
					Saluting the Nation <br className="hidden xs:block" /> Builders of Tomorrow
				</h1>

				<p className="mt-3 max-w-none hidden sm:block text-xs leading-relaxed text-white xs:mt-4 xs:text-xs sm:mt-5 sm:max-w-[95%] sm:text-sm md:max-w-[85%] md:text-base lg:max-w-[100%] lg:text-lg xl:leading-7">
					Prime Bank and The Daily Star, proudly recognizing outstanding O‑Level and A‑Level students across
					Bangladesh. Register, get recognized, and unlock pathways to study abroad.
				</p>
			</div>

			<div
				className={[
					"absolute bottom-0 left-3 right-0 xs:bottom-0 xs:left-auto xs:right-0  ",
					"    xl:bottom-0 xl:right-0",
				].join(" ")}
			>
				<Link
					href="/registration"
					className={[
						"inline-flex h-auto w-full items-center justify-center gap-0 rounded-full bg-brand-blue px-3 py-1 text-[10px] font-medium text-white no-underline transition-opacity hover:opacity-90",
						"xs:gap-0 xs:py-1  sm:text-sm sm:w-auto sm:px-10 sm:py-4 md:px-7 md:py-3",
						"lg:px-14 lg:py-6 xl:gap-[5px] xl:px-[120px] xl:py-[38px] xl:text-base",
					].join(" ")}
				>
					Register Now
					<ArrowUpRight className="size-3 shrink-0 stroke-[2.5] xs:size-3 sm:size-6" />
				</Link>
			</div>
		</div>
	);
};
