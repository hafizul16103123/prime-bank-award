"use client";

import { Button, buttonVariants } from "@/components/ui";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";

import type { NavItem } from "./nav-items";

type NavbarMobileSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	items: NavItem[];
};

export const NavbarMobileSheet = ({ open, onOpenChange, items }: NavbarMobileSheetProps) => {
	return (
		<div className="flex shrink-0 items-center lg:hidden">
			<Sheet open={open} onOpenChange={onOpenChange}>
				<SheetTrigger
					type="button"
					className={cn(
						buttonVariants({ variant: "outline", size: "icon" }),
						"size-9 rounded-full border-tartiary sm:size-10",
					)}
					aria-label="Open menu"
				>
					<Menu className="size-5" />
				</SheetTrigger>
				<SheetContent
					side="right"
					showCloseButton={false}
					overlayClassName="bg-foreground/30 backdrop-blur-[2px]"
					className={cn(
						"flex h-full max-h-[100dvh] min-h-0 w-full max-w-[280px] flex-col gap-0 overflow-hidden border-l bg-background p-0 text-foreground shadow-xl",
						"data-[side=right]:w-full data-[side=right]:sm:max-w-[500px]",
						"animate-in slide-in-from-right duration-200",
					)}
				>
					<SheetHeader className="relative shrink-0 space-y-1 px-6 pt-6 pb-4 text-left">
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
							onClick={() => onOpenChange(false)}
							aria-label="Close menu"
						>
							<X className="size-5" />
						</Button>
						<SheetTitle className="pr-10 text-2xl font-medium text-foreground">Menu</SheetTitle>
					</SheetHeader>

					<nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
						<div className="flex flex-col gap-0.5">
							{items.map((item) => (
								<Link
									key={item.path}
									href={item.path}
									onClick={() => onOpenChange(false)}
									className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
								>
									{item.title}
								</Link>
							))}
						</div>
					</nav>

					<div className="mt-auto flex shrink-0 flex-col gap-2 border-t border-border px-6 py-6">
						<Link href="/sign-in" onClick={() => onOpenChange(false)} className="w-full">
							<Button
								type="button"
								variant="outline"
								className="w-full gap-2 rounded-full border-tartiary py-5 text-base font-medium"
							>
								Login <LogIn className="size-5" />
							</Button>
						</Link>
						<Link href="/registration" onClick={() => onOpenChange(false)} className="w-full">
							<Button
								type="button"
								className="w-full gap-2 rounded-full bg-brand-blue py-5 text-base font-medium text-white hover:opacity-90"
							>
								Register <ArrowUpRight className="size-5 stroke-[3]" />
							</Button>
						</Link>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
