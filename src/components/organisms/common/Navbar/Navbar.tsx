"use client";

import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMobileSheet } from "./NavbarMobileSheet";
import { PUBLIC_NAV_ITEMS } from "./nav-items";

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<Container>
			<header
				className={cn(
					"flex items-center justify-between gap-3 bg-white/90 backdrop-blur-lg",
					"px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-8 2xl:px-0 lg:py-7 xl:py-9",
				)}
			>
				<NavbarLogo />
				<NavbarDesktop items={PUBLIC_NAV_ITEMS} />
				<NavbarMobileSheet open={menuOpen} onOpenChange={setMenuOpen} items={PUBLIC_NAV_ITEMS} />
			</header>
		</Container>
	);
};
