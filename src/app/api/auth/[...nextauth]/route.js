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
				const user = { ...credentials };
				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken || null;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.accessToken = token.accessToken;

			return session;
		},
		async redirect({ url, baseUrl }) {
			return new URL(process.env.NEXTAUTH_URL);
		},
	},
	session: {
		strategy: "jwt",
	},
});
export { handler as GET, handler as POST };
