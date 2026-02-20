import { Metadata } from 'next';

import { OrdersContent } from './content';

export const metadata: Metadata = {
	title: 'Мои заказы | Green Shop',
};

export default function OrdersPage() {
	return <OrdersContent />;
}
