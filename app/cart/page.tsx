import type { Metadata } from 'next';

import { ContentCart } from './content';

export const metadata: Metadata = {
	title: 'Корзина',
};

export default function CartPage() {
	return <ContentCart />;
}
