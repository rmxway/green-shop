import { FC, memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Flexbox } from '@/components/Layout';
import { useAppSelector } from '@/services';
import { changeCategoryWithSort } from '@/store/reducers/combineActions';
import { toggleSortSelectorMemoized } from '@/store/reducers/commonSelectors';

import { Category, WrapperCategory } from './styled';

const skeletonArray = [...new Set(new Array(15).fill('').map(() => Math.round(Math.random() * (200 - 50 + 1) + 100)))];

export const Categories: FC<{ isLoading: boolean }> = memo(
	({ isLoading }) => {
		const { search, categories } = useAppSelector((state) => toggleSortSelectorMemoized(state.products));

		return (
			<>
				<h5>Категории</h5>
				<WrapperCategory>
					<Flexbox $justify="flex-start" $gap={4}>
						{isLoading
							? skeletonArray.map((el) => (
								<Skeleton key={el} inline borderRadius={8} height={31} width={el} />
							))
							: categories.map((category) => (
								<Category
									$active={category.active}
									type="button"
									key={category.name}
									disabled={search.length !== 0}
									onClick={() => changeCategoryWithSort(category.name)}
								>
									{category.name}
								</Category>
							))}
					</Flexbox>
				</WrapperCategory>
			</>
		);
	},
	(prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading,
);

Categories.displayName = 'Categories';

export default Categories;
