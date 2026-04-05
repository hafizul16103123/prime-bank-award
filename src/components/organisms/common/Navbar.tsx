import { Button, Container } from "@/components/ui";
import { ArrowUpRight, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
	{ title: "Home", path: "/" },
	{ title: "Winners", path: "/winners" },
	{ title: "News", path: "/news" },
	{ title: "About Us", path: "/about" },
	{ title: "Contact Us", path: "/contact" },
];

export const Navbar = () => {
	return (
		<Container>
			<header className="flex items-center justify-between py-9 bg-white/90 backdrop-blur-lg">
				<Image src="/daily_star_logo.png" alt="The Daily Star Logo" width={191} height={38} />

				<div className="flex items-center gap-6 ">
					<nav className="hiddenflex items-center gap-1 border border-tartiary rounded-full px-4 py-2">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className="px-4 font-medium text-foreground hover:text-primary transition-colors rounded-full"
							>
								{item.title}
							</Link>
						))}
					</nav>
					<div className="flex items-center gap-3 ">
						<Button className="flex items-center gap-[5px] px-6 py-5  font-medium bg-pale text-black rounded-full hover:opacity-90 transition-opacity">
							Login <LogIn className="w-6 h-6" />
						</Button>
						<Link href="/registration">
							<Button className="flex items-center gap-[5px] px-6 py-5  font-medium bg-brand-blue text-white rounded-full hover:opacity-90 transition-opacity">
								Register <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
							</Button>
						</Link>
					</div>
				</div>
			</header>
		</Container>
	);
};
