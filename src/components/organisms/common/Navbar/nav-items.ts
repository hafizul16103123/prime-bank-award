export type NavItem = {
	title: string;
	path: string;
};

/** Active nav link: home is exact `/` only; other items match path prefix. */
export function isNavPathActive(pathname: string, itemPath: string): boolean {
	const p = pathname || "/";
	if (itemPath === "/") {
		return p === "/" || p === "";
	}
	return p === itemPath || p.startsWith(`${itemPath}/`);
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
	{ title: "Home", path: "/" },
	{ title: "Winners", path: "/winners" },
	{ title: "News", path: "/news" },
	{ title: "About Us", path: "/about" },
	{ title: "Contact Us", path: "/contact" },
];
