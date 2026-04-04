import { Button } from "@/components/ui";
import { CircleCheck, Edit } from "lucide-react";

export const StudentInfo = () => {
	return (
		<div className="bg-white rounded-lg border border-tartiary p-4 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="size-[136px] overflow-hidden rounded-lg bg-muted">
					<img
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
						alt="Student"
						className="size-full object-cover"
					/>
				</div>

				<div>
					<p className="text-xl font-medium mt-2">Shahriar Rahman</p>
					<p className="text-black/60 text-sm">01929459195</p>
					<p className="text-black/60 text-sm">A-Level</p>
					<p className="text-black/60 text-sm">Scholastica</p>

					<div className="bg-[#DFFABC] text-[#0A6700] rounded-full flex gap-2 py-2 px-4 items-center w-max mt-2">
						<CircleCheck size={18} />
						<span className="text-sm">Eligible for Award</span>
					</div>
				</div>
			</div>

			<Button type="button" variant="outline" size="lg" className="gap-1.5 bg-frost">
				<Edit className="size-3.5" />
				Edit Information
			</Button>
		</div>
	);
};
