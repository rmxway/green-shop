import { Metadata } from 'next';

import { ContentCompare } from './content';

export const metadata: Metadata = {
	title: 'Сравнение товаров',
	description: 'Сравните характеристики товаров',
};

export default function ComparePage() {
	return <ContentCompare />;
}
