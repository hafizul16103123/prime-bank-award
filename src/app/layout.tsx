import { Poppins } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={poppins.variable}>
			<body className="relative">
				<main className=" ">{children}</main>
				<ToastContainer />
			</body>
		</html>
	);
}
