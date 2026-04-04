import axios, { AxiosError, AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";

export const createAxiosClient = (baseURL: string) => {
	const instance = axios.create({
		baseURL,
		headers: {
			Accept: "application/json",
		},
	});

	instance.interceptors.request.use(
		async (config: any) => {
			const session: any = await getSession();
			if (session?.user?.accessToken) {
				config.headers = config.headers || {};
				config.headers.Authorization = `Bearer ${session.user.accessToken}`;
			}
			const queryParams = config.params ? "?" + new URLSearchParams(config.params).toString() : "";
			return config;
		},
		(error) => Promise.reject(error)
	);

	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			if (error.response?.status === 401) {
				await signOut();
			}
			return Promise.reject(error);
		}
	);

	return instance;
};
