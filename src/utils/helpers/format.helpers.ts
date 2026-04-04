export const formatStatus = (status: string): string => {
	if (!status) {
		return "";
	} else {
		return status
			.toLowerCase()
			.replace(/_/g, " ")
			.replace(/\b(\w)/g, (x) => x.toUpperCase());
	}
};
