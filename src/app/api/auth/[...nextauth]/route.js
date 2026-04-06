import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	pages: {
		signIn: "/sign-in",
	},
	secret: process.env.NEXTAUTH_SECRET,
	site: process.env.NEXTAUTH_URL,
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "credentials",
			async authorize(credentials) {
				if (!credentials?.accessToken) {
					return null;
				}
				return {
					id: String(credentials.email ?? credentials.name ?? "user"),
					accessToken: credentials.accessToken,
					name: credentials.name ?? null,
					role: credentials.role ?? null,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken || null;
				token.role = user.role ?? null;
				if (user.name) {
					token.name = user.name;
				}
			}
			return token;
		},
		async session({ session, token }) {
			session.user.accessToken = token.accessToken ?? null;
			session.user.role = token.role ?? null;
			if (token.name) {
				session.user.name = token.name;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			const origin = process.env.NEXTAUTH_URL ?? baseUrl;
			if (url.startsWith("/")) {
				return `${origin}${url}`;
			}
			try {
				const next = new URL(url);
				if (next.origin === new URL(origin).origin) {
					return url;
				}
			} catch {
				/* ignore */
			}
			return origin;
		},
	},
	session: {
		strategy: "jwt",
	},
});
export { handler as GET, handler as POST };
