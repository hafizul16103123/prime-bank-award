"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectInputProps = {
	label?: string;
	options: string[];
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
};

export function SelectInput({
	label,
	options,
	value,
	onValueChange,
	placeholder = "Select…",
	className,
	disabled,
}: SelectInputProps) {
	return (
		<div className={cn("space-y-1", className)}>
			{label && <Label className="text-xs font-normal text-muted-foreground">{label}</Label>}
			<Select value={value} onValueChange={(v) => onValueChange(v ?? "")} disabled={disabled}>
				<SelectTrigger className="h-9 w-full min-w-0 max-w-none justify-between">
					<SelectValue className="min-w-0" placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((opt) => (
						<SelectItem key={opt} value={opt}>
							{opt}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
