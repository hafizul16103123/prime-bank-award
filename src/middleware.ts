import { defaultDashboardPath, roleCanAccessDashboardPath } from "@/lib/dashboardAccess";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	async function middleware(req) {
		const token = await getToken({ req });
		const pathname = req.nextUrl.pathname;
		const isAuthenticated = !!token?.accessToken;

		if (pathname.startsWith("/sign-in") && isAuthenticated) {
			const role = typeof token?.role === "string" ? token.role : null;
			return NextResponse.redirect(new URL(defaultDashboardPath(role), req.url));
		}

		if (pathname.startsWith("/dashboard") && isAuthenticated) {
			const role = typeof token?.role === "string" ? token.role : null;
			if (!roleCanAccessDashboardPath(role, pathname)) {
				return NextResponse.redirect(new URL(defaultDashboardPath(role), req.url));
			}
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized({ token, req }) {
				const pathname = req.nextUrl.pathname;
				if (pathname.startsWith("/sign-in")) {
					return true;
				}
				if (pathname.startsWith("/dashboard")) {
					return !!token?.accessToken;
				}
				return true;
			},
		},
		pages: {
			signIn: "/sign-in",
		},
	},
);

export const config = {
	matcher: ["/dashboard/:path*"],
};
