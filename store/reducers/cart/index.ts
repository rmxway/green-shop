import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CART_COUNT_PER_PAGE } from '@/services/constants';
import { CartState, IProduct } from '@/types';

import { changeCount } from './helpers';

export const initialState: CartState = {
	items: [],
	totalPrice: 0,
	countPerPage: CART_COUNT_PER_PAGE,
	page: 1,
	step: 1,
};

const cartReducer = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, { payload: item }: PayloadAction<IProduct>) => {
			state.items.push({
				...item,
				count: item.count || 1,
			});
		},
		deleteFromCart: (state, { payload }: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== payload);

			const isLastItemOnPage = state.items.length === state.countPerPage * state.page - state.countPerPage;
			if (isLastItemOnPage && state.page !== 1) {
				state.page -= 1;
			}
		},
		increaseCount: (state, { payload: id }: PayloadAction<number>) => {
			changeCount({ state, id, type: 'increase' });
		},
		decreaseCount: (state, { payload: id }: PayloadAction<number>) => {
			changeCount({ state, id, type: 'decrease' });
		},
		trashAll: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
		changePage: (state, { payload }: PayloadAction<number>) => {
			state.page = payload;
		},
		changeStep: (state, { payload }: PayloadAction<number>) => {
			state.step = payload;
		},
		calculateTotalPrice: (state) => {
			state.totalPrice = !state.items.length
				? 0
				: state.items.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);
		},
	},
});

const { actions, reducer } = cartReducer;

export const {
	addToCart,
	deleteFromCart,
	increaseCount,
	decreaseCount,
	trashAll,
	changePage,
	changeStep,
	calculateTotalPrice,
} = actions;

export default reducer;
