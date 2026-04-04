"use client";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

interface PropsType {
	label?: string;
	isDisabled?: boolean;
	getFileHandler?: any;
	isRequired?: boolean;
	id?: string;
	fileFormat: string[];
	supportFormat: string;
}

export const FileUploaderDnd: FC<PropsType> = (props) => {
	const { id = "", fileFormat, supportFormat, isDisabled, isRequired = false, getFileHandler, label } = props;
	const [dragCount, setDragCount] = useState<number>(0);

	const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			if (!fileFormat.includes(e.target.files[0].type)) {
				alert("Invalid File type! ");
				return;
			} else {
				if (e.target.files[0]) getFileHandler(e.target?.files[0]);
			}
		}
	};

	return (
		<div>
			{label && <p className={`font-normal mb-1 mt-4 `}>{label}</p>}
			<input
				hidden
				type="file"
				name={id}
				multiple={false}
				id={`upload-img-${id}`}
				onChange={handleFileUpload}
				style={{ height: "1px", background: "black" }}
				required={isRequired}
				disabled={isDisabled}
			/>
			<div
				id="dropZone"
				className={`${dragCount > 0 ? "active" : ""} py-16 px-2 flex justify-center bg-[#F6F6F6]  rounded-md `}
				title="Choose or drag & drop a file to Upload"
				onClick={() => document.getElementById(`upload-img-${id}`)?.click()}
			>
				<div>
					<div className="flex flex-col items-center">
						<Image src="/images/icons/upload.png" width={16} height={16} alt="" />
					</div>

					<p className="text-center text-[10px] text-lightGray">Upload Media </p>
				</div>
			</div>
		</div>
	);
};
