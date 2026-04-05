import Image from "next/image";
import Link from "next/link";

export const NavbarLogo = () => {
	return (
		<Link href="/" className="min-w-0 shrink-0">
			<Image
				src="/daily_star_logo.png"
				alt="The Daily Star Logo"
				width={191}
				height={38}
				className="h-7 w-auto max-w-[min(100%,11rem)] sm:h-8 sm:max-w-none md:h-9 lg:h-[38px]"
				priority
			/>
		</Link>
	);
};
