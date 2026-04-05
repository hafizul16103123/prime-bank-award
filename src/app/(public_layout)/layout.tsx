import { Footer, Navbar } from "@/components/organisms";
import { ToastContainer } from "react-toastify";
import "../globals.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-white">
			<div className="sticky top-0 z-10 shrink-0">
				<Navbar />
			</div>
			{/* Not <main> — root layout already wraps the app in <main>; avoid nested mains. */}
			<div className="w-full min-h-0 flex-1 pt-4 sm:pt-5 md:pt-6 lg:pt-8">{children}</div>
			<Footer />
			<ToastContainer />
		</div>
	);
}
