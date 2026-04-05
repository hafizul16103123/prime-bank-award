"use client";

import * as React from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue = {
	name: FieldPath<FieldValues>;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name as FieldPath<FieldValues> }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);

	if (!fieldContext) {
		throw new Error("useFormField must be used within <FormField>");
	}

	if (!itemContext) {
		throw new Error("useFormField must be used within <FormItem>");
	}

	const { getFieldState, formState } = useFormContext();
	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const FormItem = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
	({ className, ...props }, ref) => {
		const id = React.useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div ref={ref} className={cn("space-y-2", className)} {...props} />
			</FormItemContext.Provider>
		);
	},
);
FormItem.displayName = "FormItem";

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
	const { error, formItemId } = useFormField();

	return (
		<Label htmlFor={formItemId} className={cn(error && "text-destructive", className)} {...props} />
	);
}

function FormControl({ children }: { children: React.ReactElement }) {
	const { error, formItemId } = useFormField();

	return React.cloneElement(children, {
		id: formItemId,
		"aria-invalid": !!error || undefined,
	} as React.Attributes & { id?: string; "aria-invalid"?: boolean });
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			id={formDescriptionId}
			className={cn("text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}

function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error.message ?? "") : children;

	if (!body) {
		return null;
	}

	return (
		<p
			id={formMessageId}
			className={cn("text-xs text-destructive", className)}
			{...props}
		>
			{body}
		</p>
	);
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
