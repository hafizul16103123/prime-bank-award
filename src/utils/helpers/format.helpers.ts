export function extractDateOnly(dateInput: Date | string) {
	let isoString: string;

	if (dateInput instanceof Date) {
		isoString = dateInput.toISOString();
	} else if (typeof dateInput === "string") {
		isoString = new Date(dateInput).toISOString();
	} else {
		return "";
	}

	return isoString.split("T")[0];
}

export function extractTimeOnly(dateInput: Date | string) {
	let isoString: string;

	if (dateInput instanceof Date) {
		isoString = dateInput.toISOString();
	} else if (typeof dateInput === "string") {
		isoString = new Date(dateInput).toISOString();
	} else {
		return "";
	}

	return isoString.split("T")[1].split("Z")[0];
}

export function formatStatus(input?: string): string {
	if (!input) return "";
	return input.trim().toUpperCase().replace(/\s+/g, "_");
}

export function formatStatusToTitleCaseList(input?: string): string {
	if (!input) return "";
	return input
		.split(",")
		.map((item) => {
			const trimmed = item.trim().toLowerCase();
			return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
		})
		.join(",");
}

export const formatNumber = (number: string | number = 0): string => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCanadianPhoneNumber = (value: string) => {
	const cleaned = value?.replace(/\D/g, "")?.slice(0, 14);

	const match = cleaned?.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

	if (match) {
		const part1 = match[1] ? `(${match[1]}` : "";
		const part2 = match[2] ? `) ${match[2]}` : "";
		const part3 = match[3] ? `-${match[3]}` : "";

		return `${part1}${part2}${part3}`.trim();
	}

	return value;
};

export const formatPhoneNumberToDigits = (phoneNumber: string): string => {
	return phoneNumber.replace(/\D/g, "");
};
