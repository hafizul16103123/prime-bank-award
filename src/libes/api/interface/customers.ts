export interface ICustomers {
	total: number;
	totalPages: number;
	nextPage: any;
	pageNumber: number;
	items: Customer[];
}

export interface Customer {
	customer: Customer;
	shop: Shop;
	totalAppointments: number;
	totalServices: number;
	vin?: string;
}

export interface Customer {
	id: string;
	clientId: string;
	name: string;
	email: string;
	phone: string;
	image: any;
	shopId: string;
}

export interface Shop {
	name: string;
	address: string;
	province: string;
	city: string;
	postalCode: string;
}
