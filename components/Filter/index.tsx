import { FC, useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Flexbox } from '@/components/Layout';
import { Input } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/services';
import { debounceFunction } from '@/services/helpers';
import { searchProducts, searchValue } from '@/store/reducers/products';
import { productsStore } from '@/store/types';

import { StyledFilter } from './styled';
import { ToggleSort } from './ToggleSort';

export const Filter: FC<{ isLoading: boolean }> = ({ isLoading }) => {
	const { fetchedItems, reservedItems } = useAppSelector(productsStore);
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
		}, [dispatch],
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
					placeholder="Search"
					value={value}
					onChange={handleChange}
					noPadding
					disabled={!reservedItems.length && !fetchedItems.length}
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
						<ToggleSort sort="rating" value="Popular" disabled={!fetchedItems.length} />
						<ToggleSort sort="price" value="Price" disabled={!fetchedItems.length} />
						<ToggleSort sort="default" value="Reset" onClick={resetInput} />
					</>
				)}
			</Flexbox>
		</StyledFilter>
	);
};

export default Filter;
