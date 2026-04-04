import { FC } from "react";

interface PropsType {
	onOpen: any;
	onClose: any;
	children: any;
}
export const ReusableModal: FC<PropsType> = ({ onOpen, onClose, children }) => {
	return (
		<>
			{onOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
					<div className="absolute inset-0 bg-black/70  opacity-75" onClick={onClose}></div>
					<div className="z-10">{children}</div>
				</div>
			)}
		</>
	);
};
