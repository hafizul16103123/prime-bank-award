import { Navbar } from "@/components/organisms";
import { ToastContainer } from "react-toastify";
import "../globals.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="sticky top-0">
				<Navbar />
			</div>
			<main className=" bg-white h-screen">{children}</main>
			<ToastContainer />
		</>
	);
}
