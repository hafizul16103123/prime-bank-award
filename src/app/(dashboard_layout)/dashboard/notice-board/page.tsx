import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Notice Board",
};

export default function NoticeBoardPage() {
	return (
		<div className="space-y-2">
			<h1 className="font-heading text-2xl font-semibold text-foreground">Notice Board</h1>
			<p className="text-sm text-muted-ink">Notices and announcements will be listed here.</p>
		</div>
	);
}
