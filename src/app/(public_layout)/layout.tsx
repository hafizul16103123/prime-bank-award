import { ToastContainer } from "react-toastify";
import "../globals.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className=" bg-default h-screen">{children}</main>
			<ToastContainer />
		</>
	);
}
