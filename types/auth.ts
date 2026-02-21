export interface User {
	id: string;
	email: string;
	name?: string;
	surname?: string;
	phone?: string;
	deliveryAddress?: string;
	createdAt: string;
}

export interface OrderItem {
	id: number;
	title: string;
	price: number;
	count: number;
	category: string;
}

export interface Order {
	id: string;
	/** Последовательный номер заказа (уникальный, выдаётся при создании) */
	orderNumber?: number;
	userId?: string;
	name: string;
	surname: string;
	phone: string;
	email: string;
	deliveryAddress: string;
	toApartment: boolean;
	items: OrderItem[];
	totalPrice: number;
	status: 'pending' | 'processing' | 'completed' | 'cancelled';
	createdAt: string;
}
