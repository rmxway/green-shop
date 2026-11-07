import { current } from '@reduxjs/toolkit';

import { ResponseProducts } from '@/store/api';
import { IProduct, ProductsState } from '@/types';

export const initialItems = (state: ProductsState, response: ResponseProducts) => {
	const { data, categories } = response;
	state.fetching = false;
	state.lastUpdated = Date.now();

	// Сохраняем пользовательские состояния (избранное, выбранные товары)
	const userStates = new Map<number, { favorite?: boolean; checked?: boolean }>();
	state.fetchedItems.forEach((item) => {
		if (item.favorite || item.checked) {
			userStates.set(item.id, {
				favorite: item.favorite,
				checked: item.checked,
			});
		}
	});

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
	state.filteredItems = state.fetchedItems;

	// Восстанавливаем пользовательские состояния
	state.fetchedItems.forEach((item) => {
		const preserved = userStates.get(item.id);
		if (preserved) {
			item.favorite = preserved.favorite;
			item.checked = preserved.checked;
		}
	});

	state.error = '';
};

export const initialOneProduct = (state: ProductsState, item: IProduct) => {
	state.fetchedItems = [item];
	state.fetching = false;
};

export const togglesInProduct = (state: ProductsState, id: number, type: 'checked' | 'favorite', value?: boolean) => {
	const index = state.fetchedItems.findIndex((el) => el.id == id);
	const item = state.fetchedItems[index];
	state.fetchedItems[index] = { ...item, [type]: value ?? !item[type] };
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

export const changeCurrentPage = (state: ProductsState) => {
	state.page = state.typePage === 'products' ? state.productsPage : state.favoritesPage;
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
