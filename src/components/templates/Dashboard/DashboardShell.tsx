"use client";

import { AdminSidebar, AuthHeader } from "@/components/organisms";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen min-h-0 overflow-hidden">
			<AdminSidebar variant="desktop" />

			<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
				<AuthHeader onMenuClick={() => setSidebarOpen(true)} />

				<div className="min-h-0 flex-1 overflow-auto bg-default p-4 sm:p-6">{children}</div>
			</div>

			<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
				<SheetContent
					side="left"
					className="p-0"
					overlayClassName="bg-foreground/30 backdrop-blur-[2px]"
				>
					<AdminSidebar variant="mobile" onNavigate={() => setSidebarOpen(false)} />
				</SheetContent>
			</Sheet>
		</div>
	);
}

