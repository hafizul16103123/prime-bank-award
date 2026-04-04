"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PopoverProps {
	children: React.ReactNode;
	content: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	position?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
	offset?: number;
	className?: string;
}

export default function Popover({
	children,
	content,
	isOpen,
	onClose,
	position = "bottom",
	offset = 8,
	className = "",
}: PopoverProps) {
	const triggerRef = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (
				isOpen &&
				popoverRef.current &&
				triggerRef.current &&
				!popoverRef.current.contains(event.target as Node) &&
				!triggerRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("touchstart", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen && triggerRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
			const scrollY = window.pageYOffset || document.documentElement.scrollTop;

			let top = 0;
			let left = 0;

			switch (position) {
				case "top":
					top = triggerRect.top + scrollY - offset;
					left = triggerRect.left + scrollX + triggerRect.width / 2;
					break;
				case "bottom":
					top = triggerRect.bottom + scrollY + offset;
					left = triggerRect.left + scrollX + triggerRect.width / 2;
					break;
				case "left":
					top = triggerRect.top + scrollY + triggerRect.height / 2;
					left = triggerRect.left + scrollX - offset;
					break;
				case "right":
					top = triggerRect.top + scrollY + triggerRect.height / 2;
					left = triggerRect.right + scrollX + offset;
					break;
				case "top-left":
					top = triggerRect.top + scrollY - offset;
					left = triggerRect.left + scrollX;
					break;
				case "top-right":
					top = triggerRect.top + scrollY - offset;
					left = triggerRect.right + scrollX;
					break;
				case "bottom-left":
					top = triggerRect.bottom + scrollY + offset;
					left = triggerRect.left + scrollX;
					break;
				case "bottom-right":
					top = triggerRect.bottom + scrollY + offset;
					left = triggerRect.right + scrollX;
					break;
			}

			setPopoverStyle({
				position: "absolute",
				top: `${top}px`,
				left: `${left}px`,
				zIndex: 9999,
			});
		}
	}, [isOpen, position, offset]);

	const getTransformOrigin = () => {
		switch (position) {
			case "top":
				return "bottom center";
			case "bottom":
				return "top center";
			case "left":
				return "right center";
			case "right":
				return "left center";
			case "top-left":
				return "bottom left";
			case "top-right":
				return "bottom right";
			case "bottom-left":
				return "top left";
			case "bottom-right":
				return "top right";
			default:
				return "top center";
		}
	};

	const getPositionClasses = () => {
		switch (position) {
			case "top":
			case "bottom":
				return "-translate-x-1/2";
			case "left":
				return "-translate-x-full -translate-y-1/2";
			case "right":
				return "-translate-y-1/2";
			case "top-left":
			case "bottom-left":
				return "";
			case "top-right":
			case "bottom-right":
				return "-translate-x-full";
			default:
				return "-translate-x-1/2";
		}
	};

	const popoverContent = isOpen ? (
		<div
			ref={popoverRef}
			style={{
				...popoverStyle,
				transformOrigin: getTransformOrigin(),
			}}
			className={`
        ${getPositionClasses()}
        bg-white rounded-lg shadow-lg border border-gray-200 p-2 max-w-xs
        animate-in fade-in-0 zoom-in-95 duration-200
        ${className}
      `}
		>
			{content}
		</div>
	) : null;

	return (
		<>
			<div ref={triggerRef} className="inline-block">
				{children}
			</div>
			{typeof window !== "undefined" && createPortal(popoverContent, document.body)}
		</>
	);
}
