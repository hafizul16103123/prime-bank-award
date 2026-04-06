import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Footer = () => {
	return (
		<Container>
			<footer className="bg-background text-foreground mt-[185px]">
				<div className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-4 md:px-6 lg:px-8 xl:px-10">
					<Image
						src="/images/footer_logo.png"
						alt="Prime Bank"
						width={1500}
						height={1500}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1440px"
						className="h-auto w-full max-w-full object-cover object-center sm:object-contain"
					/>

					<div className={cn("border-t border-border", "mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-[56px]")} />

					<div
						className={cn(
							"flex flex-col items-center gap-5 py-5 text-center",
							"sm:gap-6 sm:py-6",
							"md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-4 md:gap-y-5 md:py-7 md:text-left",
							"lg:py-8 xl:py-10",
						)}
					>
						<p className="order-2 max-w-prose text-xs leading-relaxed text-muted-ink sm:text-sm md:order-1 md:max-w-xs lg:max-w-none">
							© 2026 Prime Bank PLC – All rights reserved.
						</p>

						<div className="order-1 flex items-center justify-center gap-5 sm:gap-6 md:order-2 lg:gap-8">
							<a
								href="#"
								className="text-foreground transition-colors hover:text-muted-foreground"
								aria-label="Facebook"
							>
								<Image
									src="/images/fb.png"
									alt=""
									width={100}
									height={100}
									className="h-auto w-4 object-contain sm:w-[17px] lg:w-[18px]"
								/>
							</a>
							<a
								href="#"
								className="text-foreground transition-colors hover:text-muted-foreground"
								aria-label="Instagram"
							>
								<Image
									src="/images/ig.png"
									alt=""
									width={100}
									height={100}
									className="h-auto w-6 object-contain sm:w-7 lg:w-[30px]"
								/>
							</a>
							<a
								href="#"
								className="text-foreground transition-colors hover:text-muted-foreground"
								aria-label="X"
							>
								<Image
									src="/images/x.png"
									alt=""
									width={100}
									height={100}
									className="h-auto w-5 object-contain sm:w-[22px] lg:w-[25px]"
								/>
							</a>
							<a
								href="#"
								className="text-foreground transition-colors hover:text-muted-foreground"
								aria-label="YouTube"
							>
								<Image
									src="/images/yt.png"
									alt=""
									width={100}
									height={100}
									className="h-auto w-7 object-contain sm:w-8 lg:w-[33px]"
								/>
							</a>
						</div>

						<nav
							className={cn(
								"order-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-muted-ink",
								"sm:text-sm",
								"md:justify-end",
							)}
							aria-label="Legal"
						>
							<a href="#" className="whitespace-nowrap transition-colors hover:text-foreground">
								Terms of Use
							</a>
							<span className="hidden text-muted-foreground/50 sm:inline" aria-hidden>
								|
							</span>
							<a href="#" className="whitespace-nowrap transition-colors hover:text-foreground">
								Privacy Policy
							</a>
							<span className="hidden text-muted-foreground/50 sm:inline" aria-hidden>
								|
							</span>
							<a href="#" className="whitespace-nowrap transition-colors hover:text-foreground">
								Cookies Policy
							</a>
						</nav>
					</div>
				</div>
			</footer>
		</Container>
	);
};
