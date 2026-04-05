/** Safe on server (no global `FileList`). */
export function isFileList(value: unknown): value is FileList {
	return typeof FileList !== "undefined" && value instanceof FileList;
}
