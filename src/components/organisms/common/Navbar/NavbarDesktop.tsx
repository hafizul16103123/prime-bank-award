import { Button } from "@/components/ui";
import { ArrowUpRight, LogIn } from "lucide-react";
import Link from "next/link";

import type { NavItem } from "./nav-items";

type NavbarDesktopProps = {
	items: NavItem[];
};

export const NavbarDesktop = ({ items }: NavbarDesktopProps) => {
	return (
		<div className="hidden items-center gap-4 lg:flex lg:gap-5 xl:gap-6">
			<nav className="flex items-center gap-0.5 rounded-full border border-tartiary px-2 py-1.5 sm:gap-1 xl:px-4 xl:py-2">
				{items.map((item) => (
					<Link
						key={item.path}
						href={item.path}
						className="rounded-full px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary xl:px-4 xl:text-base"
					>
						{item.title}
					</Link>
				))}
			</nav>
			<div className="flex items-center gap-2 xl:gap-3">
				<Link href="/sign-in">
					<Button
						type="button"
						className="flex items-center gap-1.5 rounded-full bg-pale px-4 py-3 text-sm font-medium text-black hover:opacity-90 xl:gap-[5px] xl:px-6 xl:py-5 xl:text-base"
					>
						Login <LogIn className="size-5 xl:size-6" />
					</Button>
				</Link>
				<Link href="/registration">
					<Button
						type="button"
						className="flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white hover:opacity-90 xl:gap-[5px] xl:px-6 xl:py-5 xl:text-base"
					>
						Register <ArrowUpRight className="size-5 stroke-[3] xl:size-6" />
					</Button>
				</Link>
			</div>
		</div>
	);
};
