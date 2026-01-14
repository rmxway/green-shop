import { SubmitHandler } from 'react-hook-form';

import { protocol } from '@/services';
import { getHost } from '@/services/domainData';
import { store } from '@/store';

import { OrderFields } from './schemaOrder';

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
		
		const responseData = await res.json();
		
		if (!res.ok) {
			const errorMessage =
				responseData.errors && typeof responseData.errors === 'object'
					? Object.values(responseData.errors).join(', ')
					: responseData.error || 'Something went wrong...';
			throw new Error(errorMessage);
		}

		return responseData;
	} catch (err) {		
		if (err instanceof Error) {
			throw err;
		}
		throw new Error((err as Error).message);
	}
};
