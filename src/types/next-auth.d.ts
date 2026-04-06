import type { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"] & {
			accessToken?: string | null;
			role?: string | null;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string | null;
		role?: string | null;
	}
}
