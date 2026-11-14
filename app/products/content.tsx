'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Categories, Filter, ProductsGrid } from '@/components';
import { Container, LayerBlock } from '@/components/Layout';
import { containerVars } from '@/components/ProductsGrid/styled';
import { CurrencySwitcher, WarningMessage } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/services';
import { useGetProductsQuery } from '@/store/api';
import { currentItemsMemoized } from '@/store/reducers/commonSelectors';
import { changePage } from '@/store/reducers/products';
import { productsStore } from '@/store/types';

export const ContentProducts = () => {
	const { fetchedItems, filteredItems, error, page, countPerPage } = useAppSelector(productsStore);
	const currentItems = useAppSelector((state) => currentItemsMemoized(productsStore(state), filteredItems));
	const [isTimeout, setIsTimeout] = useState(false);

	const shouldFetch = fetchedItems.length <= 1;
	const { isLoading, isError } = useGetProductsQuery(null, { skip: !shouldFetch });
	const dispatch = useAppDispatch();

	const isReallyLoading = isLoading && !isTimeout;

	useEffect(() => {
		if (shouldFetch && isLoading) {
			const timer = setTimeout(() => {
				setIsTimeout(true);
			}, 15000);

			return () => clearTimeout(timer);
		}

		if (!shouldFetch) {
			setIsTimeout(false);
		}

		return undefined;
	}, [shouldFetch, isLoading]);

	// Определяем тип ошибки
	const isCriticalError = fetchedItems.length === 0 && (error || isError || isTimeout);
	const isWarning = fetchedItems.length > 0 && (error || isError || isTimeout);

	const fnChangePage = (p: number) => {
		dispatch(changePage(p));
	};

	return (
		<Container>
			<Filter isLoading={isReallyLoading} />
			<Categories isLoading={isReallyLoading} />
			<CurrencySwitcher />

			{/* Критическая ошибка - нет данных */}
			{isCriticalError && (
				<LayerBlock>
					{isTimeout
						? 'Превышено время ожидания загрузки товаров. Проверьте подключение к интернету и попробуйте обновить страницу.'
						: 'Произошла ошибка при загрузке товаров. Попробуйте обновить страницу.'}
				</LayerBlock>
			)}

			{/* Предупреждение - есть кэшированные данные */}
			{isWarning && (
				<WarningMessage message={error || 'Не удалось обновить данные. Показаны сохраненные данные.'} />
			)}

			<ProductsGrid
				isLoading={isReallyLoading}
				pagination
				items={filteredItems}
				{...{ currentItems, page, countPerPage, fnChangePage }}
			/>
			{!currentItems.length && !isLoading && !isCriticalError && (
				<motion.div variants={containerVars} initial="hidden" animate="visible" exit="hidden">
					<LayerBlock $fixedPadding>
						{currentItems.length > 0 && 'По вашему запросу ничего не найдено'}
						{currentItems.length === 0 && 'Товары не найдены.'}
					</LayerBlock>
				</motion.div>
			)}
		</Container>
	);
};

export default ContentProducts;
