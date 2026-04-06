"use client";

import { roleCanAccessDashboardPath } from "@/lib/dashboardAccess";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { sidebarItems } from "./constant";

function pathIsActive(pathname: string, itemPath: string) {
	return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export const AdminSidebar = () => {
	const pathname = usePathname() ?? "";
	const { data: session } = useSession();
	const role = session?.user?.role ?? null;

	const filteredSections = sidebarItems
		.map((section) => ({
			...section,
			items: section.items.filter((item) => roleCanAccessDashboardPath(role, item.path)),
		}))
		.filter((section) => section.items.length > 0);

	return (
		<aside className="flex h-full min-h-0 w-[220px] min-w-[220px] shrink-0 flex-col border-r border-tartiary bg-white">
			{/* Logo */}
			<div className="flex items-center gap-2.5 px-4 py-4 border-b border-tartiary">
				<span className="font-semibold text-sm text-foreground">Prime Bank PLC</span>
			</div>

			<nav className="min-h-0 flex-1 overflow-y-auto py-2">
				{filteredSections.map((section) => (
					<div key={section.title} className="mb-1 mt-2">
						<p className="px-4 py-1.5 text-xs    text-muted-foreground">{section?.title}</p>
						{section.items.map((item) => (
							<Link key={`${section.title}-${item.label}-${item.path}`} href={item?.path}>
								<button
									type="button"
									className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
										pathIsActive(pathname, item.path)
											? "border-r-2 border-primary bg-sidebar-accent font-medium text-primary"
											: "text-primary/80 hover:bg-muted"
									}`}
								>
									<item.icon className="h-4 w-4 shrink-0" />
									<span className="flex-1 text-left text-sm">{item?.label}</span>
								</button>
							</Link>
						))}
					</div>
				))}
			</nav>
		</aside>
	);
};
