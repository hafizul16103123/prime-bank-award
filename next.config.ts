import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	env: {
		API_URL: process.env.API_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

		EMAIL_SENDER_SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
		EMAIL_SENDER_SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
		EMAIL_SENDER_SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
		EMAIL_SENDER_SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
		EMAIL_SENDER_SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM,
		BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "u26mbodektt9mdbt.public.blob.vercel-storage.com",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
