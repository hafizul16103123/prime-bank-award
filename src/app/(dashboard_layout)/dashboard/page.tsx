import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function DashboardHomePage() {
	return (
		<div className="space-y-2">
			<h1 className="font-heading text-2xl font-semibold text-foreground">Dashboard</h1>
			<p className="text-sm text-muted-ink">Overview and quick links will appear here.</p>
		</div>
	);
}
