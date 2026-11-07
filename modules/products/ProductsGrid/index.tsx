'use client';

import 'react-loading-skeleton';

import { LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';

import { Pagination } from '@/components';
import { LayerBlock } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { SkeletonCard } from '@/components/ProductCard/SkeletonCard';
import { useAppDispatch, useAppSelector } from '@/services';
import { currentItemsMemoized } from '@/store/reducers/commonSelectors';
import { changePage, changeTypePage } from '@/store/reducers/products';
import { productsStore } from '@/store/types';
import { IProduct, TypePages } from '@/types';

import { containerVars, FetchingBlock, WrapperComponent } from './styled';

interface ProductsGridProps {
	items: IProduct[];
	isLoading?: boolean;
	pagination?: boolean;
	keyPage: TypePages;
	hasError?: boolean;
}

// items нужен потому что универсальный компонент, как для продуктов так и для избранного
export const ProductsGrid = ({
	items,
	isLoading = false,
	pagination,
	keyPage,
	hasError = false,
}: ProductsGridProps) => {
	const { error, page, countPerPage } = useAppSelector(productsStore);
	const currentItems = currentItemsMemoized(useAppSelector(productsStore), items);
	const dispatch = useAppDispatch();
	const skeletonArr = useCallback(
		() => new Array<number>(countPerPage).fill(NaN).map(() => Math.random() * countPerPage),
		[countPerPage],
	);

	useEffect(() => {
		dispatch(changeTypePage(keyPage));
	}, [keyPage, dispatch]);

	const fnChangePage = (p: number) => {
		dispatch(changePage(p));
	};

	return (
		<WrapperComponent>
			<LayoutGroup>
				<FetchingBlock variants={containerVars} animate="visible" initial="hidden">
					{isLoading && skeletonArr().map((item) => <SkeletonCard key={item} />)}
					{!isLoading &&
						!!currentItems.length &&
						!error &&
						currentItems.map((product, idx) => (
							<ProductCard
								product={product}
								layout
								transition={{ duration: 0.3, delay: idx * 0.05 }}
								variants={containerVars}
								initial="hidden"
								animate="visible"
								exit="hidden"
								key={product.id}
							/>
						))}
				</FetchingBlock>
			</LayoutGroup>

			{pagination && <Pagination {...{ items, isLoading, countPerPage, page, fnChangePage }} />}

			{!items.length && !isLoading && !hasError && (
				<motion.div variants={containerVars} initial="hidden" animate="visible" exit="hidden">
					<LayerBlock $fixedPadding>
						{keyPage === 'products' && items.length > 0 && 'По вашему запросу ничего не найдено'}
						{keyPage === 'products' &&
							items.length === 0 &&
							'Товары не найдены.'}
						{keyPage === 'favorites' && (
							<>
								Ничего не добавлено в избранное, перейдите в{' '}
								<Link href="/products">Каталог товаров</Link>
							</>
						)}
					</LayerBlock>
				</motion.div>
			)}
		</WrapperComponent>
	);
};

export default ProductsGrid;
