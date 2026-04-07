"use client";

import { useApiClient } from "@/libes/hooks";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { FC, useId } from "react";

interface PropsType {
	label?: string;
	setValue: any;
	imageURL?: string;
	property: keyof any;
	showImage?: boolean;
}

export const FileUpload: FC<PropsType> = ({ label, property, imageURL, showImage, setValue }) => {
	const { upload, loading } = useApiClient();
	const inputId = useId();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		handleUploadPolicyImage(file || null);
	};

	const handleUploadPolicyImage = async (file: File | null) => {
		if (file) {
			const formData = new FormData();
			formData.append("image", file);
			try {
				const { data }: any = await upload("API_URL", "upload/image", formData);
				const url = data?.data?.url;
				setValue(property, url, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
			} catch (error) {
				console.error("Upload failed", error);
			}
		}
	};

	const handleDeleteFile = () => {
		setValue(property, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true });
	};

	return (
		<div>
			{label && <p className={`font-normal mb-1 mt-5 text-sm `}>{label}</p>}

			{imageURL ? (
				<div className="relative h-full z-0">
					{imageURL && (
						<div className="flex items-center justify-center">
							<Image
								src={imageURL}
								alt=""
								width={500}
								height={500}
								className="h-[159px] max-h-[159px] object-cover"
							/>
						</div>
					)}
					<X className="absolute top-0 right-0 cursor-pointer" onClick={handleDeleteFile} />
				</div>
			) : (
				<div>
					<input type="file" id={inputId} onChange={handleFileChange} style={{ display: "none" }} />

					<label htmlFor={inputId} className="upload-label">
						<div className="border-[2px]  border-dashed border-gray-300 rounded-lg p-4 h-full max-h-[250px] flex items-center justify-center ">
							{loading ? (
								<p className="text-center text-sm">
									Please wait <br /> Loading...
								</p>
							) : (
								<div className="flex flex-col gap-1 items-center">
									<Upload className="mb-2 h-8 w-8 text-muted-foreground" />
									<p className="text-sm font-medium text-foreground">Upload Images</p>
									<p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
									<span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 w-full max-w-[217px]">
										Select Image
									</span>
								</div>
							)}
						</div>
					</label>
				</div>
			)}
		</div>
	);
};
