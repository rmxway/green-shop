import { FC, memo, useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Flexbox } from '@/components/Layout';
import { Input } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/services';
import { debounceFunction } from '@/services/helpers';
import { filterRelevantSelectorMemoized } from '@/store/reducers/commonSelectors';
import { searchProducts, searchValue } from '@/store/reducers/products';

import { StyledFilter } from './styled';
import { ToggleSort } from './ToggleSort';

export const Filter: FC<{ isLoading: boolean }> = memo(
	({ isLoading }) => {
		const { reservedItemsLength, fetchedItemsLength } = useAppSelector((state) =>
			filterRelevantSelectorMemoized(state.products),
		);
		const [value, setValue] = useState('');
		const dispatch = useAppDispatch();

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const searchText = e.target.value;

				setValue(searchText);

				debounceFunction(() => {
					dispatch(searchProducts(searchText));
					dispatch(searchValue(searchText));
				});
			},
			[dispatch],
		);

		const resetInput = useCallback(() => {
			setValue('');
		}, []);

		return (
			<StyledFilter>
				{isLoading ? (
					<Skeleton inline borderRadius={8} height={40} width={300} />
				) : (
					<Input
						name="search"
						placeholder="Поиск"
						value={value}
						onChange={handleChange}
						noPadding
						disabled={reservedItemsLength === 0 && fetchedItemsLength === 0}
					/>
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
							<ToggleSort sort="default" value="Сброс" onClick={resetInput} />
						</>
					)}
				</Flexbox>
			</StyledFilter>
		);
	},
	(prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading,
);

export default Filter;
