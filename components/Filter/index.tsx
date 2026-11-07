import { FC, memo, useCallback, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Flexbox } from '@/components/Layout';
import { Icon, Input } from '@/components/ui';
import { debounceFunction, useAppDispatch, useAppSelector } from '@/services';
import { searchProducts, searchValue } from '@/store/reducers/products';

import { SearchClearButton, SearchFieldWrapper, StyledFilter } from './styled';
import { ToggleSort } from './ToggleSort';

export const Filter: FC<{ isLoading: boolean }> = memo(
	({ isLoading }) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const search = useAppSelector((state) => state.products.search);
		const fetchedItemsLength = useAppSelector((state) => state.products.fetchedItems.length);
		const dispatch = useAppDispatch();

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const searchText = e.target.value;
				debounceFunction(() => {
					dispatch(searchValue(searchText));
					dispatch(searchProducts(searchText));
				});
			},
			[dispatch],
		);

		const handleClearSearch = useCallback(() => {
			dispatch(searchValue(''));
			dispatch(searchProducts(''));
			if (inputRef.current) inputRef.current.value = '';
		}, [dispatch]);

		useEffect(() => {
			if (inputRef.current) inputRef.current.value = search;
		}, [search]);

		return (
			<StyledFilter>
				{isLoading ? (
					<Skeleton inline borderRadius={8} height={40} width={300} />
				) : (
					<SearchFieldWrapper>
						<Input
							ref={inputRef}
							name="search"
							placeholder="Поиск"
							onChange={handleChange}
							noPadding
							disabled={fetchedItemsLength === 0}
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
