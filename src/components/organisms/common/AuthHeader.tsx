"use client";

import { User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export const AuthHeader = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="z-10 flex h-[53px] shrink-0 items-center justify-between border-b border-tartiary bg-white px-6">
			<div className="flex ml-auto gap-4 relative" ref={dropdownRef}>
				<User size={20} className="cursor-pointer" onClick={() => setOpen((prev) => !prev)} />

				{open && (
					<div className="absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
						<div className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => signOut()}>
							Logout
						</div>
					</div>
				)}
			</div>
		</header>
	);
};
