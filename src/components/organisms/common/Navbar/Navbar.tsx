"use client";

import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMobileSheet } from "./NavbarMobileSheet";
import { PUBLIC_NAV_ITEMS } from "./nav-items";

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname() ?? "/";

	return (
		<Container>
			<header
				className={cn(
					"flex items-center justify-between gap-3 bg-white/90 backdrop-blur-lg",
					" py-3 sm:gap-4 sm:py-4  md:py-5  lg:py-7 xl:py-9",
				)}
			>
				<NavbarLogo />
				<NavbarDesktop items={PUBLIC_NAV_ITEMS} pathname={pathname} />
				<NavbarMobileSheet
					open={menuOpen}
					onOpenChange={setMenuOpen}
					items={PUBLIC_NAV_ITEMS}
					pathname={pathname}
				/>
			</header>
		</Container>
	);
};
