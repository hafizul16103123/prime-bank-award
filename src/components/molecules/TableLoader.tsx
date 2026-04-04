import { FC } from "react";

interface PropsType {
	rowNumber: number;
	cellNumber: number;
}
export const TableLoader: FC<PropsType> = ({ rowNumber, cellNumber }) => {
	return (
		<>
			{Array.from({ length: rowNumber }).map((_, rowIndex) => (
				<tr key={rowIndex}>
					{Array.from({ length: cellNumber }).map((_, cellIndex) => (
						<td className="px-4 align-middle" key={cellIndex}>
							<div className="my-3 h-3 w-full max-w-[min(100%,12rem)] rounded-full bg-muted animate-pulse" />
						</td>
					))}
				</tr>
			))}
		</>
	);
};
