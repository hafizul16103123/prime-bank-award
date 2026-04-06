import { Footer, Navbar } from "@/components/organisms";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata: Metadata = {
	title: `Page not found | ${process.env.SITE_NAME ?? "Prime Bank"}`,
	description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col bg-white">
			<div className="sticky top-0 z-[500] shrink-0">
				<Navbar />
			</div>
			<div className="flex w-full min-h-0 flex-1 flex-col items-center justify-center px-4 py-16 text-center lg:pt-2">
				<p className="font-heading text-7xl font-semibold tracking-tight text-brand-blue sm:text-8xl">404</p>
				<h1 className="mt-4 font-heading text-2xl font-medium text-foreground sm:text-3xl">Page not found</h1>
				<p className="mt-3 max-w-md text-sm text-muted-ink sm:text-base">
					The link may be broken, or the page may have been removed. Check the URL or return to the home page.
				</p>
				<Link
					href="/"
					className={cn(
						"mt-8 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-transparent bg-brand-blue px-8 text-base font-medium text-white shadow-sm transition-all outline-none",
						"focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 hover:opacity-90 active:translate-y-px",
						"[&_svg]:pointer-events-none [&_svg]:shrink-0",
					)}
				>
					<Home className="size-5" aria-hidden />
					Back to home
				</Link>
			</div>
			<Footer />
		</div>
	);
}
