import { FC } from "react";

interface PropsType {
	label?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	required?: boolean;
	error?: string;
	name?: string;
}

export const CustomSwitch: FC<PropsType> = ({ label, checked = false, onChange, error, name, required }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.checked);
	};

	const switchId = `switch-${name || Math.random().toString(36).substring(2, 8)}`;

	return (
		<div className="flex items-center justify-between gap-3">
			<p className={`font-normal `}>
				{label} <span className="text-red-500 ">{required && "*"}</span>
			</p>
			<div className="flipswitch">
				<input
					type="checkbox"
					name={name}
					className="flipswitch-cb"
					id={switchId}
					checked={checked}
					onChange={handleChange}
				/>
				<label className="flipswitch-label" htmlFor={switchId}>
					<div className="flipswitch-inner"></div>
					<div className="flipswitch-switch"></div>
				</label>
			</div>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
};
