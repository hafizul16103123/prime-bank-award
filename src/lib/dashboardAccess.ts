export type DashboardRole = "ADMIN" | "SCHOOL_ADMIN" | "STUDENT";

const ROLE_SET = new Set<DashboardRole>(["ADMIN", "SCHOOL_ADMIN", "STUDENT"]);

export function normalizeDashboardRole(value: string | null | undefined): DashboardRole | null {
	if (!value) return null;
	const u = String(value).toUpperCase();
	return ROLE_SET.has(u as DashboardRole) ? (u as DashboardRole) : null;
}

/** Longer prefixes first so nested routes resolve correctly. */
const DASHBOARD_PATH_ACCESS: { prefix: string; roles: DashboardRole[] }[] = [
	{ prefix: "/dashboard/registration", roles: ["ADMIN", "SCHOOL_ADMIN"] },
	{ prefix: "/dashboard/winners", roles: ["ADMIN", "SCHOOL_ADMIN"] },
	{ prefix: "/dashboard/my-application", roles: ["ADMIN", "STUDENT"] },
	{ prefix: "/dashboard/notice-board", roles: ["ADMIN", "STUDENT"] },
	{ prefix: "/dashboard/higher-study", roles: ["ADMIN", "STUDENT"] },
];

export function defaultDashboardPath(role: string | null | undefined): string {
	const r = normalizeDashboardRole(role);
	if (r === "ADMIN") return "/dashboard";
	if (r === "SCHOOL_ADMIN") return "/dashboard/registration";
	if (r === "STUDENT") return "/dashboard/my-application";
	return "/sign-in";
}

export function roleCanAccessDashboardPath(role: string | null | undefined, pathname: string): boolean {
	const r = normalizeDashboardRole(role);
	if (!r) return false;
	const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
	if (!path.startsWith("/dashboard")) return false;
	if (r === "ADMIN") return true;
	if (path === "/dashboard") return false;
	for (const { prefix, roles } of DASHBOARD_PATH_ACCESS) {
		if (path === prefix || path.startsWith(`${prefix}/`)) {
			return roles.includes(r);
		}
	}
	return false;
}
