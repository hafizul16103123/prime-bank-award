import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { createAxiosClient } from "../api";
import { BASE_URLS } from "../api/baseURL";

export const useApiClient = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const request = useCallback(
		async (baseKey: keyof typeof BASE_URLS, method: string, url: string, payload?: any, isFormData = false) => {
			setLoading(true);
			setError(null);
			const baseURL = BASE_URLS[baseKey];

			if (!baseURL) {
				throw new Error(`Base URL for ${baseKey} is not defined`);
			}

			const axiosInstance = createAxiosClient(baseURL);

			try {
				const response: AxiosResponse = await axiosInstance({
					method,
					url,
					data: payload,
					headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
				});
				return response;
			} catch (err) {
				const axiosError = err as AxiosError;
				console.error(`Error in ${method.toUpperCase()} [${baseKey}${url}]:`, axiosError);
				setError(axiosError.message);
				throw axiosError;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const get = useCallback((base: keyof typeof BASE_URLS, url: string) => request(base, "get", url), [request]);
	const post = useCallback(
		(base: keyof typeof BASE_URLS, url: string, data: any) => request(base, "post", url, data),
		[request]
	);
	const patch = useCallback(
		(base: keyof typeof BASE_URLS, url: string, data: any) => request(base, "patch", url, data),
		[request]
	);
	const put = useCallback(
		(base: keyof typeof BASE_URLS, url: string, data: any) => request(base, "put", url, data),
		[request]
	);
	const del = useCallback((base: keyof typeof BASE_URLS, url: string) => request(base, "delete", url), [request]);
	const upload = useCallback(
		(base: keyof typeof BASE_URLS, url: string, formData: FormData) => request(base, "post", url, formData, true),
		[request]
	);

	return { get, post, patch, put, del, upload, loading, error };
};
