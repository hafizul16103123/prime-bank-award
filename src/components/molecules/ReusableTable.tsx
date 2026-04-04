import { FC } from "react";
import { TableLoader } from "./TableLoader";

interface PropsType {
	data: any;
	tableHeader: string[];
	isLoading: boolean;
	children: any;
}

export const ReusableTable: FC<PropsType> = ({ tableHeader, data, isLoading, children }) => {
	return (
		<div>
			<table className="w-full min-w-max table-auto text-left border-separate border-spacing-y-2">
				<thead className="bg-secondary break-words">
					<tr>
						{tableHeader?.map((head, index) => (
							<th
								key={head}
								className={`${index === 0 ? "rounded-s-[10px]" : ""} ${
									index === tableHeader.length - 1 ? "rounded-e-[10px] " : ""
								}`}
							>
								<p className="font-medium leading-none text-xs text-white px-3 py-4">{head}</p>
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{isLoading ? (
						<TableLoader rowNumber={5} cellNumber={tableHeader?.length} />
					) : data?.length > 0 ? (
						children
					) : (
						<tr>
							<td className="text-center py-40" colSpan={tableHeader.length}>
								No Data Found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
