import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LogIn } from "lucide-react";
import Link from "next/link";

import { isNavPathActive, type NavItem } from "./nav-items";

type NavbarDesktopProps = {
	items: NavItem[];
	pathname: string;
};

export const NavbarDesktop = ({ items, pathname }: NavbarDesktopProps) => {
	return (
		<div className="hidden items-center gap-4 lg:flex lg:gap-5 xl:gap-6 ">
			<nav className="flex items-center gap-0.5 rounded-full border border-tartiary px-2 py-1.5 sm:gap-1 xl:px-2 xl:py-[7px]">
				{items.map((item) => {
					const active = isNavPathActive(pathname, item.path);
					return (
						<Link
							key={item.path}
							href={item.path}
							aria-current={active ? "page" : undefined}
							className={cn(
								"rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors xl:px-4 xl:text-base",
								active ? "bg-frost text-brand-blue" : "text-foreground hover:text-primary",
							)}
						>
							{item.title}
						</Link>
					);
				})}
			</nav>
			<div className="flex items-center gap-2 xl:gap-3">
				<Link href="/sign-in">
					<Button
						type="button"
						className="flex items-center gap-1.5 rounded-full bg-pale px-4 py-3 text-sm font-medium text-black hover:opacity-90 xl:gap-[5px] xl:px-6 xl:py-6 xl:text-base"
					>
						Login <LogIn className="size-5 xl:size-6" />
					</Button>
				</Link>
				<Link href="/registration">
					<Button
						type="button"
						className="flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-3 text-sm font-medium text-white hover:opacity-90 xl:gap-[5px] xl:px-6 xl:py-6 xl:text-base"
					>
						Register <ArrowUpRight className="size-5 stroke-[2] xl:size-6" />
					</Button>
				</Link>
			</div>
		</div>
	);
};
