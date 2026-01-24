'use client';

import { useState } from 'react';

import { Container } from '@/components/Layout';
import { Button, LinkIcon, Modal } from '@/components/ui';
import { ProductsGrid } from '@/modules/products';
import { useAppDispatch, useAppSelector } from '@/services';
import { favoritesItemsMemoized } from '@/store/reducers/commonSelectors';
import { removeAllFavorites } from '@/store/reducers/products';
import { productsStore } from '@/store/types';

export const ContentFavorites = () => {
	const [modalShow, setModalShow] = useState(false);
	const items = favoritesItemsMemoized(useAppSelector(productsStore));
	const dispatch = useAppDispatch();

	const handleRemoveAllFavorites = () => {
		dispatch(removeAllFavorites());
		setModalShow(false);
	};

	return (
		<Container $pt>
			{items.length > 0 && (
				<LinkIcon icon="trash" onClick={() => setModalShow(true)} style={{ top: '10px', position: 'absolute' }}>
					Удалить избранное
				</LinkIcon>
			)}
			<Modal open={modalShow} onClose={() => setModalShow(false)} title="Удалить избранное">
				<div>Вы уверены, что хотите удалить все избранные товары?</div>
				<br />
				<Button $danger onClick={handleRemoveAllFavorites}>
					Удалить
				</Button>
			</Modal>

			<ProductsGrid {...{ items }} pagination keyPage="favorites" hasError={false} />
		</Container>
	);
};

export default ContentFavorites;
