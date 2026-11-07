'use client';

import { DialogModal } from '@/components';
import { Container } from '@/components/Layout';
import { ProductsGrid } from '@/modules/products';
import { useAppDispatch, useAppSelector } from '@/services';
import { favoritesItemsMemoized } from '@/store/reducers/commonSelectors';
import { removeAllFavorites } from '@/store/reducers/products';
import { productsStore } from '@/store/types';

export const ContentFavorites = () => {
	const items = favoritesItemsMemoized(useAppSelector(productsStore));
	const dispatch = useAppDispatch();

	const handleRemoveAllFavorites = () => {
		dispatch(removeAllFavorites());
	};

	return (
		<Container $pt>
			{items.length > 0 && (
				<DialogModal
					title="Удалить избранное"
					text="Вы уверены, что хотите удалить все избранные товары?"
					handleFn={handleRemoveAllFavorites}
				/>
			)}

			<ProductsGrid {...{ items }} pagination keyPage="favorites" />
		</Container>
	);
};

export default ContentFavorites;
