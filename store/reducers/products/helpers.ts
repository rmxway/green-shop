import { current } from '@reduxjs/toolkit';

import { IProduct, ProductsState } from '@/services';
import { ResponseProducts } from '@/store/api';

export const initialItems = (state: ProductsState, response: ResponseProducts) => {
	const { data, categories } = response;
	state.fetching = false;

	// Skip update if data length matches (optimization to avoid unnecessary updates)
	if (state.reservedItems.length === data.length && state.reservedItems.length > 0) {
		return;
	}

	// there is some product on the first page
	if (state.fetchedItems.length === 1) {
		const index = data.findIndex((product) => product.id === state.fetchedItems[0].id);
		if (index !== -1) {
			data[index] = current(state.fetchedItems[0]);
		}
	}

	state.total = data.length;

	state.categories.push(
		...categories.map((item) => ({
			name: item,
			active: false,
		})),
	);

	if (state.categories.length > 0) {
		state.categories[0].active = true;
	}

	state.fetchedItems = [...data];
	state.reservedItems = [...state.fetchedItems];
	state.error = '';
};

export const initialOneProduct = (state: ProductsState, item: IProduct) => {
	if (state.reservedItems.length === 0) {
		state.fetchedItems = [item];
		state.fetching = false;
		state.reservedItems = [item];
	}
};

export const anyTogglesInProduct = (
	state: ProductsState,
	id: number,
	type: 'checked' | 'favorite',
	value?: boolean,
) => {
	const toggleInArray = (array: IProduct[]) => {
		const currentItem = array.find((item) => item.id === id);
		if (currentItem) {
			currentItem[type] = value ?? !currentItem[type];
		}
	};

	toggleInArray(state.reservedItems);
	toggleInArray(state.fetchedItems);
};

export const calcCategory = (state: ProductsState, name: string, reset?: boolean) => {
	state.categories.forEach((category) => {
		category.active = category.name === name;
	});

	if (reset) {
		return;
	}

	state.productsPage = 1;
	state.page = state.productsPage;

	if (name === 'all') {
		state.fetchedItems = [...state.reservedItems];
	} else {
		state.fetchedItems = state.reservedItems.filter((item) => item.category === name);
	}
};

export const resetItems = (state: ProductsState, category = true, page = false) => {
	state.sort.name = 'default';
	state.sort.toggle = false;
	state.search = '';
	state.fetchedItems = [...state.reservedItems];
	state.fetching = false;
	
	if (category) {
		calcCategory(state, 'all', true);
	}
	
	if (page) {
		state.page = 1;
		state.productsPage = 1;
	}
};

export const changeCurrentPage = (state: ProductsState) => {
	state.page = state.typePage === 'products' ? state.productsPage : state.favoritesPage;
};
