import { X } from "lucide-react";
import { FC } from "react";
import { Text } from "../atoms";

interface PropsType {
	title?: string;
	closeModal: any;
}
export const ModalHeader: FC<PropsType> = ({ title, closeModal }) => {
	return (
		<div className="flex flex-row justify-between">
			<Text weight="medium">{title}</Text>
			<div onClick={closeModal}>
				<X size={24} />
			</div>
		</div>
	);
};
