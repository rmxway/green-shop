'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { DialogModal } from '@/components';
import { Container, LayerBlock } from '@/components/Layout';
import { ProductsGrid } from '@/modules/products';
import { containerVars } from '@/modules/products/ProductsGrid/styled';
import { useAppDispatch, useAppSelector } from '@/services';
import { currentItemsMemoized } from '@/store/reducers/commonSelectors';
import { changePage, clearFavorites } from '@/store/reducers/favorite';
import { favoriteStore } from '@/store/types';

export const ContentFavorites = () => {
	const { items, countPerPage, page } = useAppSelector(favoriteStore);

	const currentItems = useAppSelector((state) => currentItemsMemoized(favoriteStore(state), items));
	const dispatch = useAppDispatch();

	const handleRemoveAllFavorites = () => {
		dispatch(clearFavorites());
	};

	const fnChangePage = (p: number) => {
		dispatch(changePage(p));
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

			<ProductsGrid {...{ items, currentItems, countPerPage, page, fnChangePage }} pagination />
			{items.length == 0 && (
				<motion.div variants={containerVars} initial="hidden" animate="visible" exit="hidden">
					<LayerBlock $fixedPadding>
						Ничего не добавлено в избранное, перейдите в <Link href="/products">Каталог товаров</Link>
					</LayerBlock>
				</motion.div>
			)}
		</Container>
	);
};

export default ContentFavorites;
