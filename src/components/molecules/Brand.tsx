import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface PropsType {
	isClickable?: boolean;
}
export const Brand: FC<PropsType> = ({ isClickable }) => {
	return (
		<>
			{isClickable ? (
				<Link href="/" className="bg-black">
					<Image src="/images/logo.png" alt="Logo" width={112} height={30} />
				</Link>
			) : (
				<Image src="/images/logo.png" alt="Logo" width={150} height={43} />
			)}
		</>
	);
};
