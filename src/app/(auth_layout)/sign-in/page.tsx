import { SignInUnit } from "@/components/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: `Signin | ${process.env.SITE_NAME}`,
		default: `Signin | ${process.env.SITE_NAME}`,
	},
};
const SignIn = () => {
	return <SignInUnit />;
};

export default SignIn;
