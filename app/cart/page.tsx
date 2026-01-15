import type { Metadata } from 'next';

import { ContentCart } from '@/modules/cart';

export const metadata: Metadata = {
	title: 'Корзина',
};

export default function CartPage() {
	return <ContentCart />;
}
