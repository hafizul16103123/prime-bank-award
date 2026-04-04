export interface IClients {
	total: number;
	totalPages: number;
	nextPage: any;
	pageNumber: number;
	items: Item[];
}

export interface Item {
	client: Client;
	shop: Shop;
	totalAppointments: number;
	totalCustomer: number;
}

export interface Client {
	id: string;
	name: string;
	email: string;
	phone: string;
	status: string;
	image: any;
	clientId?: string;
}

export interface Shop {
	id: string;
	shopId: string;
	name: string;
	address: string;
	province: string;
	city: string;
	postalCode: string;
}
