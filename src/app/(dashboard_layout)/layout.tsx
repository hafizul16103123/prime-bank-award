import { AdminSidebar, AuthHeader } from "@/components/organisms";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import { DashboardShell } from "@/components/templates/Dashboard/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthSessionProvider>
			<DashboardShell>
				{children}
			</DashboardShell>
			<ToastContainer />
		</AuthSessionProvider>
	);
}
