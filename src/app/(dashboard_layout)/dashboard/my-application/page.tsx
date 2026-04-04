import { MyApplicationUnit } from "@/components/templates";
import { Suspense } from "react";

const MyApplication = () => {
	return (
		<Suspense>
			<MyApplicationUnit />
		</Suspense>
	);
};

export default MyApplication;
