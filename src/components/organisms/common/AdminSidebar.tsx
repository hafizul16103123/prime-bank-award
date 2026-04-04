"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "./constant";

export const AdminSidebar = () => {
	const pathname = usePathname();

	console.log({ pathname });
	return (
		<aside className="w-[220px] min-w-[220px] h-screen border-r border-tartiary bg-white flex flex-col">
			{/* Logo */}
			<div className="flex items-center gap-2.5 px-4 py-4 border-b border-tartiary">
				<span className="font-semibold text-sm text-foreground">Prime Bank PLC</span>
			</div>

			<nav className="flex-1 overflow-y-auto py-2">
				{sidebarItems.map((section) => (
					<div key={section.title} className="mb-1 mt-2">
						<p className="px-4 py-1.5 text-xs    text-muted-foreground">{section?.title}</p>
						{section.items.map((item) => (
							<Link key={item.label} href={item?.path}>
								<button
									className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
										pathname === item.path
											? "border-r-2 border-primary bg-sidebar-accent font-medium text-primary"
											: "text-primary/80 hover:bg-muted"
									}`}
								>
									<item.icon className="w-4 h-4" />
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
