import { SubmitHandler } from 'react-hook-form';

import { protocol } from '@/services';
import { getHost } from '@/services/domainData';
import { store } from '@/store';

import { OrderFields } from './schemaOrder';

interface ApiErrorResponse {
	success: false;
	errors?: Record<string, string>;
	error?: string;
}

export const submitOrder: SubmitHandler<OrderFields> = async (data): Promise<void> => {
	const { items: cartItems, totalPrice } = store.getState().cart;
	const items = cartItems.map(({ id, title, price, count, category }) => ({
		id,
		title,
		price: price * (count || 1),
		count,
		category,
	}));

	Object.assign(data, { products: { items, totalPrice } });

	try {
		const res = await fetch(`${protocol}://${getHost}/api/order`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		const rawResponseData: unknown = await res.json();

		if (!res.ok) {
			const errorResponse = rawResponseData as ApiErrorResponse;
			const errorMessage =
				errorResponse.errors && typeof errorResponse.errors === 'object'
					? Object.values(errorResponse.errors).join(', ')
					: errorResponse.error || 'Что-то пошло не так...';
			throw new Error(errorMessage);
		}

		// Success - no need to return data for SubmitHandler
	} catch (err) {
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Произошла неизвестная ошибка');
	}
};
