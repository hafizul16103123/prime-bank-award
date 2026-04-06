import { Button } from "@/components/ui";
import { AdminStudentListItem } from "@/libes/interface/registration";
import { CircleCheck, Edit, User } from "lucide-react";

export const StudentInfo = ({ data }: { data: AdminStudentListItem | null }) => {
	return (
		<div className="bg-white rounded-lg border border-tartiary p-4 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="size-[136px] overflow-hidden rounded-lg bg-muted">
					{data?.photoUrl ? (
						<img src={data?.photoUrl} alt="Student" className="size-full object-cover" />
					) : (
						<User className="size-[136px]" />
					)}
				</div>

				<div>
					<p className="text-xl font-medium mt-2">{data?.name}</p>
					<p className="text-black/60 text-sm">{data?.phoneNumber}</p>
					<p className="text-black/60 text-sm">{data?.applyingForLevel}</p>
					<p className="text-black/60 text-sm">{data?.school}</p>

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
