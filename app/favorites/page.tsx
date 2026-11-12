import type { Metadata } from 'next';

import { ContentFavorites } from './content';

export const metadata: Metadata = {
	title: 'Избранное',
};

export default function FavoritesPage() {
	return <ContentFavorites />;
}
