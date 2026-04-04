import { AdminSidebar, AuthHeader } from "@/components/organisms";
import { ToastContainer } from "react-toastify";
import "../globals.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen">
			<AdminSidebar />

			<div className="flex min-h-0 min-w-0 flex-1 flex-col">
				<AuthHeader />

				<div className="min-h-0 flex-1 overflow-auto p-6 bg-default">{children}</div>
			</div>
			<ToastContainer />
		</div>
	);
}
