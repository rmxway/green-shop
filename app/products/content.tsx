'use client';

import { memo, useEffect, useState } from 'react';

import { Categories, Filter } from '@/components';
import { Container, LayerBlock } from '@/components/Layout';
import { WarningMessage } from '@/components/ui';
import { ProductsGrid } from '@/modules/products';
import { useAppSelector } from '@/services';
import { useGetProductsQuery } from '@/store/api';
import { productsSelectorMemoized } from '@/store/reducers/commonSelectors';
import { productsStore } from '@/store/types';

export const ContentProducts = memo(() => {
	const { fetchedItems, error } = productsSelectorMemoized(useAppSelector(productsStore));
	const [isTimeout, setIsTimeout] = useState(false);

	const shouldFetch = fetchedItems.length === 0;
	const { isLoading, isError } = useGetProductsQuery(null, { skip: !shouldFetch });

	const isReallyLoading = isLoading && !isTimeout;

	useEffect(() => {
		if (shouldFetch && isLoading) {
			const timer = setTimeout(() => {
				setIsTimeout(true);
			}, 5000);

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

	return (
		<Container>
			<Filter isLoading={isReallyLoading} />
			<Categories isLoading={isReallyLoading} />

			{/* Критическая ошибка - нет данных */}
			{isCriticalError && (
				<LayerBlock>
					{isTimeout
						? 'Превышено время ожидания загрузки товаров. Проверьте подключение к интернету и попробуйте обновить страницу.'
						: 'Произошла ошибка при загрузке товаров. Попробуйте обновить страницу.'
					}
				</LayerBlock>
			)}

			{/* Предупреждение - есть кэшированные данные */}
			{isWarning && (
				<WarningMessage
					message={error || 'Не удалось обновить данные. Показаны сохраненные данные.'}
				/>
			)}

			<ProductsGrid
				items={fetchedItems}
				isLoading={isReallyLoading}
				pagination
				keyPage="products"
				hasError={!!isCriticalError}
			/>
		</Container>
	);
});

export default ContentProducts;
