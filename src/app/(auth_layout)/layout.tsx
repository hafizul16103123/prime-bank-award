import { ReduxProvider } from "@/providers";
import "../globals.css";

export default function NavLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="bg-default min-h-screen">
				<ReduxProvider>{children}</ReduxProvider>
			</main>
		</>
	);
}
