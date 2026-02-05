import { FC, memo, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Flexbox } from '@/components/Layout';
import { Icon, Input } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/services';
import { debounceFunction } from '@/services/helpers';
import { filterRelevantSelectorMemoized } from '@/store/reducers/commonSelectors';
import { searchProducts, searchValue } from '@/store/reducers/products';

import { SearchClearButton, SearchFieldWrapper, StyledFilter } from './styled';
import { ToggleSort } from './ToggleSort';

export const Filter: FC<{ isLoading: boolean }> = memo(
	({ isLoading }) => {
		const { reservedItemsLength, fetchedItemsLength } = useAppSelector((state) =>
			filterRelevantSelectorMemoized(state.products),
		);
		const search = useAppSelector((state) => state.products.search);
		const dispatch = useAppDispatch();

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const searchText = e.target.value;
				dispatch(searchValue(searchText));
				debounceFunction(() => {
					dispatch(searchProducts(searchText));
				});
			},
			[dispatch],
		);

		const handleClearSearch = useCallback(() => {
			dispatch(searchValue(''));
			dispatch(searchProducts(''));
		}, [dispatch]);

		return (
			<StyledFilter>
				{isLoading ? (
					<Skeleton inline borderRadius={8} height={40} width={300} />
				) : (
					<SearchFieldWrapper>
						<Input
							name="search"
							placeholder="Поиск"
							value={search}
							onChange={handleChange}
							noPadding
							disabled={reservedItemsLength === 0 && fetchedItemsLength === 0}
						/>
						{search.length > 0 && (
							<SearchClearButton type="button" onClick={handleClearSearch} aria-label="Очистить поиск">
								<Icon icon="times-small" size={24} />
							</SearchClearButton>
						)}
					</SearchFieldWrapper>
				)}

				<Flexbox $align="center" $nowrap $justify="flex-end" $gap={20}>
					{isLoading ? (
						<>
							<Skeleton inline borderRadius={8} height={20} width={70} />
							<Skeleton inline borderRadius={8} height={20} width={80} />
							<Skeleton inline borderRadius={8} height={20} width={50} />
						</>
					) : (
						<>
							<ToggleSort sort="rating" value="Популярные" disabled={fetchedItemsLength === 0} />
							<ToggleSort sort="price" value="Цена" disabled={fetchedItemsLength === 0} />
							<ToggleSort sort="default" value="Сброс" />
						</>
					)}
				</Flexbox>
			</StyledFilter>
		);
	},
	(prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading,
);

export default Filter;
