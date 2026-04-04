"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BackArrow = () => {
	const router = useRouter();
	return (
		<Image
			onClick={() => router.back()}
			src="/images/icons/back_arrow.png"
			alt="Back arrow"
			width={56}
			height={56}
		/>
	);
};
