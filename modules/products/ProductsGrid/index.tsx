'use client';

import 'react-loading-skeleton';

import { LayoutGroup } from 'framer-motion';
import { memo, useCallback } from 'react';

import { Pagination } from '@/components';
import { ProductCard } from '@/components/ProductCard';
import { SkeletonCard } from '@/components/ProductCard/SkeletonCard';
import { IProduct } from '@/types';

import { containerVars, FetchingBlock, WrapperComponent } from './styled';

interface ProductsGridProps {
	items: IProduct[];
	currentItems: IProduct[];
	isLoading?: boolean;
	pagination?: boolean;
	page: number;
	countPerPage: number;
	fnChangePage: (id: number) => void;
}

// items нужен потому что универсальный компонент, как для продуктов так и для избранного
export const ProductsGrid = memo(
	({ items, currentItems, isLoading = false, pagination, page, countPerPage, fnChangePage }: ProductsGridProps) => {
		const skeletonArr = useCallback(
			() => new Array<number>(countPerPage).fill(NaN).map(() => Math.random() * countPerPage),
			[countPerPage],
		);

		return (
			currentItems.length !== 0 && (
				<WrapperComponent>
					<LayoutGroup>
						<FetchingBlock variants={containerVars} animate="visible" initial="hidden">
							{isLoading && skeletonArr().map((item) => <SkeletonCard key={item} />)}
							{!isLoading &&
								!!currentItems.length &&
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
				</WrapperComponent>
			)
		);
	},
);

export default ProductsGrid;
