import { Outfit } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={cn("font-sans", outfit.variable)}>
			<body className="relative">
				<main className=" ">{children}</main>
				<ToastContainer />
			</body>
		</html>
	);
}
