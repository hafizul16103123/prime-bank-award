import { AdminSidebar, AuthHeader } from "@/components/organisms";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";
import { ToastContainer } from "react-toastify";
import "../globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthSessionProvider>
			<div className="flex h-screen min-h-0 overflow-hidden">
				<AdminSidebar />

				<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
					<AuthHeader />

					<div className="min-h-0 flex-1 overflow-auto bg-default p-6">{children}</div>
				</div>
				<ToastContainer />
			</div>
		</AuthSessionProvider>
	);
}
