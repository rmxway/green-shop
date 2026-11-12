import { current } from '@reduxjs/toolkit';

import { ResponseProducts } from '@/store/api';
import { IProduct, ProductsState } from '@/types';

export const initialItems = (state: ProductsState, response: ResponseProducts) => {
	const { data, categories } = response;
	state.fetching = false;
	state.lastUpdated = Date.now();

	// there is some product on the first page
	if (state.fetchedItems.length === 1) {
		const index = data.findIndex((product) => product.id === state.fetchedItems[0].id);
		if (index !== -1) {
			data[index] = current(state.fetchedItems[0]);
		}
	}

	state.total = data.length;

	// Always update categories to prevent any duplication issues
	state.categories = categories.map((item) => ({
		name: item,
		active: false,
	}));

	if (state.categories.length > 0) {
		state.categories[0].active = true;
	}

	state.fetchedItems = [...data];
	state.filteredItems = [...data];

	state.error = '';
};

export const initialOneProduct = (state: ProductsState, item: IProduct) => {
	state.fetchedItems = [item];
	state.fetching = false;
};

export const calcCategory = (state: ProductsState, name: string, reset?: boolean) => {
	state.categories.forEach((category) => {
		category.active = category.name === name;
	});

	if (reset) {
		return;
	}

	state.page = 1;

	if (name === 'all') {
		state.filteredItems = [...state.fetchedItems];
	} else {
		state.filteredItems = state.fetchedItems.filter((item) => item.category === name);
	}
};

export const resetItems = (state: ProductsState, category = true) => {
	state.sort.name = 'default';
	state.sort.toggle = false;
	state.filteredItems = state.fetchedItems;
	state.fetching = false;
	state.search = '';

	if (category) {
		calcCategory(state, 'all', true);
	}
};

export const applyCurrentSort = (state: ProductsState) => {
	if (state.sort.name === 'default') return;
	const { name, toggle } = state.sort;
	const sortedItems = [...state.filteredItems].sort((a, b) => {
		const aValue = Number(a[name]) || 0;
		const bValue = Number(b[name]) || 0;
		if (aValue > bValue) return -1;
		if (aValue < bValue) return 1;
		return 0;
	});
	state.filteredItems = toggle ? sortedItems.reverse() : sortedItems;
};
