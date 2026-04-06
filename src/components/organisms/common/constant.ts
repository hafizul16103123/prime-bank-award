import {
	Bell,
	BookOpen,
	Building2,
	ClipboardList,
	FileText,
	GraduationCap,
	Image,
	LayoutDashboard,
	LogOut,
	Mail,
	PenSquare,
	School,
	Trophy,
	Users,
} from "lucide-react";

interface NavItem {
	label: string;
	icon: React.ElementType;
	path: string;
	active?: boolean;
	children?: { label: string }[];
}

interface NavSection {
	title: string;
	items: NavItem[];
}

export const sidebarItems: NavSection[] = [
	{
		title: "Overview",
		items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
	},
	{
		title: "Management",
		items: [
			{ label: "Registrations", icon: FileText, path: "/dashboard/registration" },
			{ label: "Winners", icon: Trophy, path: "/dashboard/winners" },
			{ label: "My Application", icon: LogOut, path: "/dashboard/my-application" },
			{ label: "Notice Board", icon: LogOut, path: "/dashboard/notice-board" },
			{ label: "Higher Education", icon: GraduationCap, path: "/dashboard/higher-education" },
			{ label: "Alumni", icon: GraduationCap, path: "/dashboard/alumni" },
			{ label: "Higher Study", icon: BookOpen, path: "/dashboard/higher-study" },
			{ label: "Schools", icon: School, path: "/dashboard/schools" },
			{ label: "Agency", icon: Building2, path: "/dashboard/agency" },
		],
	},
	{
		title: "Content",
		items: [
			{ label: "Banners", icon: Image, path: "/dashboard/banners" },
			{ label: "Notifications", icon: Bell, path: "/dashboard/notifications" },
			{ label: "Blogs", icon: PenSquare, path: "/dashboard/blogs" },
		],
	},
	{
		title: "Settings",
		items: [
			{ label: "Email", icon: Mail, path: "/dashboard/email" },
			{ label: "Users", icon: Users, path: "/dashboard/users" },
		],
	},
];
