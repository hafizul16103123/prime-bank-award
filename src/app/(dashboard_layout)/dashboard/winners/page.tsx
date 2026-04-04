import { WinnersUnit } from "@/components/templates";
import { Suspense } from "react";

const Winners = () => {
	return (
		<Suspense>
			<WinnersUnit />
		</Suspense>
	);
};

export default Winners;
