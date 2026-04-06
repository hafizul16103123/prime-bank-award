import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	async function middleware(req) {
		const token = await getToken({ req });
		const isAuthenticated = !!token;

		if (req.nextUrl.pathname.startsWith("/sign-in") && isAuthenticated) {
			return NextResponse.redirect(new URL("/", req.url));
		}
		return NextResponse.next();
	},
	{
		callbacks: {
			async authorized({ token }) {
				return !!token?.accessToken;
			},
		},
		pages: {
			signIn: "/sign-in",
		},
	}
);
export const config = {
	matcher: ["/", "/carriers"],
};
