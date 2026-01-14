import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PRODUCTS_COUNT_PER_PAGE } from '@/services/constants';
import { IProduct, ProductsState, SortTypes, TypePages } from '@/services';
import { api, ResponseProducts } from '@/store/api';
import {
	anyTogglesInProduct,
	calcCategory,
	changeCurrentPage,
	initialItems,
	initialOneProduct,
	resetItems,
} from '@/store/reducers/products/helpers';

const initialState: ProductsState = {
	title: '',
	fetchedItems: [],
	reservedItems: [],
	total: 0,
	page: 1,
	productsPage: 1,
	favoritesPage: 1,
	typePage: 'products',
	countPerPage: PRODUCTS_COUNT_PER_PAGE,
	countFavorites: 0,
	categories: [],
	error: '',
	fetching: true,
	sort: {
		name: 'default',
		toggle: false,
	},
	search: '',
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
		setTitle: (state, { payload }: PayloadAction<string>) => {
			state.title = payload;
		},
		toggleProduct: (state, { payload }: PayloadAction<number>) => {
			anyTogglesInProduct(state, payload, 'checked');
		},
		removeAllToggledProducts: (state) => {
			state.fetchedItems.forEach((item) => {
				item.checked = false;
			});
			state.reservedItems.forEach((item) => {
				item.checked = false;
			});
		},
		sortProducts: (state, { payload }: PayloadAction<SortTypes>) => {
			const { name, toggle } = payload;

			state.sort.name = name;
			state.sort.toggle = toggle;
			state.page = 1;

			if (name === 'default') {
				resetItems(state);
			} else {
				const sortedItems = [...state.fetchedItems].sort((a, b) => {
					if (name !== undefined && a[name] && b[name]) {
						const aValue = Number(a[name]);
						const bValue = Number(b[name]);
						return aValue > bValue ? -1 : 1;
					}
					return 0;
				});

				state.fetchedItems = toggle ? sortedItems.reverse() : sortedItems;
			}
		},
		searchValue: (state, { payload }: PayloadAction<string>) => {
			state.search = payload;
		},
		searchProducts: (state, { payload }: PayloadAction<string>) => {
			const searchText = payload.toLowerCase().trim();
			calcCategory(state, 'all');
			state.fetchedItems = state.reservedItems.filter((item) => item.title.toLowerCase().includes(searchText));
		},
		toggleFavorite: (state, { payload }: PayloadAction<number>) => {
			anyTogglesInProduct(state, payload, 'favorite');

			state.countFavorites = state.reservedItems.filter((item) => item.favorite).length;
			
			const isLastItemOnPage = state.countFavorites === state.countPerPage * state.page - state.countPerPage;
			if (isLastItemOnPage && state.typePage === 'favorites') {
				state.page -= 1;
			}
		},
		removeAllFavorites: (state) => {
			state.reservedItems.forEach((item) => {
				item.favorite = false;
			});
			state.fetchedItems = state.reservedItems;
			state.countFavorites = 0;
		},
		changeTypePage: (state, { payload }: PayloadAction<TypePages>) => {
			if (state.typePage === payload) return;
			state.typePage = payload;
			changeCurrentPage(state);
		},
		changePage: (state, { payload }: PayloadAction<number>) => {
			if (state.typePage === 'favorites') {
				state.favoritesPage = payload;
			}
			if (state.typePage === 'products') {
				state.productsPage = payload;
			}
			changeCurrentPage(state);
		},
		changeCategory: (state, { payload: name }: PayloadAction<string>) => {
			calcCategory(state, name);
		},
		resetItemsAction: (state) => {
			resetItems(state);
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
				state.error = 'Something went wrong';
				state.fetching = false;
				state.fetchedItems = [];
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
				state.error = 'Something went wrong';
				state.fetching = false;
				state.fetchedItems = [];
			});
	},
});

const { actions, reducer } = productsReducer;

export const {
	fetching,
	setError,
	setTitle,
	toggleProduct,
	removeAllToggledProducts,
	sortProducts,
	searchValue,
	searchProducts,
	toggleFavorite,
	removeAllFavorites,
	resetItemsAction,
	changePage,
	changeTypePage,
	changeCategory,
} = actions;

export default reducer;
