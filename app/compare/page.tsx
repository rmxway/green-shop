import { Metadata } from 'next';

import { ContentCompare } from './content';

export const metadata: Metadata = {
	title: 'Сравнение',
	description: 'Сравните характеристики товаров',
};

export default function ComparePage() {
	return <ContentCompare />;
}
