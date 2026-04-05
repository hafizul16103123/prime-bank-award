export type NavItem = {
	title: string;
	path: string;
};

export const PUBLIC_NAV_ITEMS: NavItem[] = [
	{ title: "Home", path: "/" },
	{ title: "Winners", path: "/winners" },
	{ title: "News", path: "/news" },
	{ title: "About Us", path: "/about" },
	{ title: "Contact Us", path: "/contact" },
];
