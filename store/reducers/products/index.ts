import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PRODUCTS_COUNT_PER_PAGE } from '@/services/constants';
import { api, ResponseProducts } from '@/store/api';
import {
	applyCurrentSort,
	calcCategory,
	initialItems,
	initialOneProduct,
	resetItems,
} from '@/store/reducers/products/helpers';
import { IProduct, ProductsState, SortTypes } from '@/types';

const initialState: ProductsState = {
	title: '',
	fetchedItems: [],
	filteredItems: [],
	total: 0,
	page: 1,
	countPerPage: PRODUCTS_COUNT_PER_PAGE,
	categories: [],
	error: '',
	fetching: true,
	sort: {
		name: 'default',
		toggle: false,
	},
	search: '',
	currency: 'USD',
};

const productsReducer = createSlice({
	name: 'products',
	initialState,
	reducers: {
		fetching: (state, { payload }: PayloadAction<boolean>) => {
			state.fetching = payload;
		},
		setError: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
		},
		sortProducts: (state, { payload }: PayloadAction<SortTypes>) => {
			const { name, toggle } = payload;

			state.sort.name = name;
			state.sort.toggle = toggle;
			state.page = 1;

			if (name === 'default') {
				resetItems(state);
			} else {
				applyCurrentSort(state);
			}
		},
		searchValue: (state, { payload }: PayloadAction<string>) => {
			state.search = payload;
		},
		searchProducts: (state, { payload }: PayloadAction<string>) => {
			const searchText = payload.toLowerCase().trim();

			// TODO сделать поиск + категории
			calcCategory(state, 'all');
			state.filteredItems = state.fetchedItems.filter((item) => item.title.toLowerCase().includes(searchText));
			applyCurrentSort(state);
		},
		changePage: (state, { payload }: PayloadAction<number>) => {
			state.page = payload;
		},
		changeCategory: (state, { payload: name }: PayloadAction<string>) => {
			calcCategory(state, name);
		},
		resetItemsAction: (state) => {
			resetItems(state);
		},
		toggleCurrency: (state) => {
			state.currency = state.currency === 'USD' ? 'RUB' : 'USD';
		},
	},
	extraReducers: (builder) => {
		builder
			// Products
			.addMatcher(api.endpoints.getProducts.matchPending, (state) => {
				state.fetching = true;
			})
			.addMatcher(
				api.endpoints.getProducts.matchFulfilled,
				(state, { payload: response }: PayloadAction<ResponseProducts>) => {
					initialItems(state, response);
				},
			)
			.addMatcher(api.endpoints.getProducts.matchRejected, (state) => {
				if (state.fetchedItems.length === 0) {
					// Нет данных вообще - показываем ошибку
					state.error = 'Не удалось загрузить товары. Проверьте подключение к интернету.';
					state.fetching = false;
				} else {
					// Данные есть в кэше - показываем предупреждение
					state.error = 'Не удалось обновить данные. Показаны сохраненные данные.';
					state.fetching = false;
					// НЕ очищаем fetchedItems!
				}
			})
			// Product
			.addMatcher(api.endpoints.getProduct.matchPending, (state) => {
				state.fetching = true;
				state.fetchedItems = [];
			})
			.addMatcher(
				api.endpoints.getProduct.matchFulfilled,
				(state, { payload: item }: PayloadAction<IProduct>) => {
					initialOneProduct(state, item);
				},
			)
			.addMatcher(api.endpoints.getProduct.matchRejected, (state) => {
				state.error = 'Не удалось загрузить товар.';
				state.fetching = false;
				state.fetchedItems = [];
			});
	},
});

const { actions, reducer } = productsReducer;

export const {
	fetching,
	setError,
	sortProducts,
	searchValue,
	searchProducts,
	resetItemsAction,
	changePage,
	changeCategory,
	toggleCurrency,
} = actions;

export default reducer;
