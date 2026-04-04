"use client";

import * as React from "react";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { TableLoader } from "./TableLoader";

export type ReusableTableVariant = "default" | "elevated";

export type ReusableTableProps<T = unknown> = {
	children?: React.ReactNode;
	caption?: React.ReactNode;
	className?: string;
	tableClassName?: string;
	/**
	 * যখন দেবেন: thead + লোডিং/খালি/ডেটা লজিক চালু। না দিলে শুধু র‍্যাপার — `children` টেবিলের ভেতরের পুরো অংশ।
	 */
	tableHeader?: React.ReactNode[];
	data?: readonly T[] | null;
	isLoading?: boolean;
	emptyMessage?: string;
	skeletonRows?: number;
	variant?: ReusableTableVariant;
	headerClassName?: string;
	bodyClassName?: string;
	/** elevated বডি রোতে কার্ড লুক; `className` দিয়ে ওভাররাইড */
	bodyRowClassName?: string;
	emptyRowClassName?: string;
};

const elevatedTableClass =
	"w-full min-w-max table-auto border-separate border-spacing-y-2 text-left [&_tbody_tr]:border-0";

function DeclarativeTable<T>({
	tableHeader,
	data,
	isLoading,
	children,
	emptyMessage = "No Data Found",
	skeletonRows = 5,
	variant = "default",
	headerClassName,
	bodyClassName,
	bodyRowClassName,
	emptyRowClassName,
	caption,
	className,
	tableClassName,
}: Omit<ReusableTableProps<T>, "tableHeader"> & { tableHeader: React.ReactNode[] }) {
	const colCount = tableHeader.length;
	const hasRows = Array.isArray(data) && data.length > 0;

	const headerShell =
		variant === "elevated"
			? cn("bg-primary text-primary-foreground [&_tr]:border-0 [&_tr:hover]:bg-transparent", headerClassName)
			: cn("bg-tartiary/60 [&_tr]:border-border", headerClassName);

	const headCell = (index: number) =>
		cn(
			variant === "elevated" && index === 0 && "rounded-s-[10px]",
			variant === "elevated" && index === colCount - 1 && "rounded-e-[10px]",
			variant === "elevated" && "py-6 pl-6 font-medium text-primary-foreground",
			variant === "default" && "px-3 py-3",
		);

	const bodyShell =
		variant === "elevated"
			? cn("[&_tr]:shadow-sm [&_tbody_tr]:rounded-lg [&_tbody_tr]:bg-card [&_tbody_tr]:border-0", bodyClassName)
			: cn("[&_tr]:border-border", bodyClassName);

	const rowShell =
		variant === "elevated"
			? cn("border-0 hover:bg-muted/40 data-[state=selected]:bg-muted", bodyRowClassName)
			: bodyRowClassName;

	return (
		<div className={cn("w-full", className)}>
			<Table
				className={cn(
					variant === "elevated" && elevatedTableClass,
					variant === "default" && "text-left",
					tableClassName,
				)}
			>
				{caption ? <TableCaption>{caption}</TableCaption> : null}
				<TableHeader className={headerShell}>
					<TableRow className="border-0 hover:bg-transparent data-[state=selected]:bg-transparent">
						{tableHeader.map((head, index) => (
							<TableHead key={index} className={cn(headCell(index), "align-middle")}>
								{variant === "elevated" ? (
									<span className="block text-xs font-medium leading-none">{head}</span>
								) : (
									head
								)}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className={bodyShell}>
					{isLoading ? (
						<TableLoader rowNumber={skeletonRows} cellNumber={Math.max(colCount, 1)} />
					) : hasRows ? (
						<RowsWithClass rowClassName={rowShell}>{children}</RowsWithClass>
					) : (
						<TableRow className={cn("border-0 hover:bg-transparent", rowShell)}>
							<TableCell
								colSpan={colCount || 1}
								className={cn(
									"h-24 py-10 text-center text-muted-foreground",
									variant === "elevated" && "py-40",
									emptyRowClassName,
								)}
							>
								{emptyMessage}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

/**
 * `children`-এ যেসব সরাসরি `<tr>` আছে, তাদের ক্লাস মার্জ করে (elevated রো স্টাইল)।
 * Fragment বা একক `tr` — এক স্তর পর্যন্ত সাপোর্ট।
 */
function RowsWithClass({ children, rowClassName }: { children: React.ReactNode; rowClassName?: string }) {
	return (
		<>
			{React.Children.map(children, (child) => {
				if (!React.isValidElement(child)) return child;
				if (child.type === React.Fragment) {
					return (
						<React.Fragment key={child.key ?? undefined}>
							{React.Children.map((child.props as { children?: React.ReactNode }).children, (inner) =>
								mergeRowClass(inner, rowClassName),
							)}
						</React.Fragment>
					);
				}
				return mergeRowClass(child, rowClassName);
			})}
		</>
	);
}

function mergeRowClass(node: React.ReactNode, rowClassName?: string) {
	if (!React.isValidElement(node)) return node;
	// HTML <tr> বা TableRow — উভয়ই `className` মার্জ
	const el = node as React.ReactElement<{ className?: string }>;
	return React.cloneElement(el, {
		className: cn(rowClassName, el.props.className),
	});
}

export function ReusableTable<T = unknown>({
	tableHeader,
	children,
	caption,
	className,
	tableClassName,
	data,
	isLoading,
	emptyMessage,
	skeletonRows,
	variant = "default",
	headerClassName,
	bodyClassName,
	bodyRowClassName,
	emptyRowClassName,
}: ReusableTableProps<T>) {
	if (tableHeader !== undefined) {
		return (
			<DeclarativeTable<T>
				tableHeader={tableHeader}
				data={data}
				isLoading={isLoading}
				emptyMessage={emptyMessage}
				skeletonRows={skeletonRows}
				variant={variant}
				headerClassName={headerClassName}
				bodyClassName={bodyClassName}
				bodyRowClassName={bodyRowClassName}
				emptyRowClassName={emptyRowClassName}
				caption={caption}
				className={className}
				tableClassName={tableClassName}
			>
				{children}
			</DeclarativeTable>
		);
	}

	return (
		<div className={cn("w-full", className)}>
			<Table className={tableClassName}>
				{caption ? <TableCaption>{caption}</TableCaption> : null}
				{children}
			</Table>
		</div>
	);
}
