import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Higher Study",
};

export default function HigherStudyPage() {
	return (
		<div className="space-y-2">
			<h1 className="font-heading text-2xl font-semibold text-foreground">Higher Study</h1>
			<p className="text-sm text-muted-ink">Higher study resources and information will appear here.</p>
		</div>
	);
}
