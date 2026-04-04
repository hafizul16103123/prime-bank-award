import { FC } from "react";
import { Controller } from "react-hook-form";
import { SelectInput } from "../atoms";
type Option = { label: string; value: string };

interface PropsType {
	name: string;
	label?: string;
	error?: string;
	control: any;
	required?: boolean;
	options: Option[];
}
export const ContorlSelectPicker: FC<PropsType> = ({ label, options, name, control, ...rest }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<SelectInput
					{...rest}
					label={label}
					options={options}
					value={field.value}
					onChange={field.onChange}
					error={fieldState.error?.message}
				/>
			)}
		/>
	);
};
