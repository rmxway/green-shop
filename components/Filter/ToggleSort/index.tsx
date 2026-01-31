'use client';

import React, { FC, memo, useRef } from 'react';

import { Icon } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/services';
import { toggleSortSelectorMemoized } from '@/store/reducers/commonSelectors';
import { sortProducts } from '@/store/reducers/products';

import { Toggle } from './styled';

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value: string;
	sort: 'rating' | 'price' | 'default';
	onClick?: () => void;
}

const ToggleSort: FC<ToggleProps> = memo(({ sort, value, disabled, onClick, ...props }) => {
	const { sort: productsSort, search, categories } = useAppSelector((state) =>
		toggleSortSelectorMemoized(state.products),
	);
	const checked = useRef(false);
	const idName = `sort-${sort}`;
	const dispatch = useAppDispatch();

	const handleClick = () => {
		onClick?.();

		if (sort === 'default' && productsSort.name === sort && search === '' && categories[0].active) return;

		if (sort === 'default') {
			dispatch(sortProducts({ name: sort }));
			return;
		}

		checked.current = !checked.current;
		dispatch(sortProducts({ name: sort, toggle: checked.current }));
	};

	return (
		<Toggle type="button" $toggle={productsSort.toggle} onClick={handleClick} disabled={disabled}>
			<input
				id={idName}
				type="radio"
				disabled={disabled}
				name="sort"
				checked={productsSort.name !== 'default' && productsSort.name === sort}
				onChange={() => null}
				{...props}
			/>
			<label htmlFor={idName}>
				{value}
				<Icon icon="arrow-down" />
			</label>
		</Toggle>
	);
});

export { ToggleSort };
export default ToggleSort;
