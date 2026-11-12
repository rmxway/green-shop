import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PRODUCTS_COUNT_PER_PAGE } from '@/services';
import { FavoriteState, IProduct } from '@/types';

const initialState: FavoriteState = {
	items: [],
	page: 1,
	countPerPage: PRODUCTS_COUNT_PER_PAGE,
};

export const favoriteReducer = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleToFavorite: (state, { payload }: PayloadAction<IProduct>) => {
			if (state.items.length == 0) {
				state.items.push(payload);
				return;
			}

			const index = state.items.findIndex((item) => item.id == payload.id);

			if (index == -1) {
				state.items.push(payload);
			} else {
				state.items.splice(index, 1);
			}

			const isLastItemOnPage = state.items.length === state.countPerPage * state.page - state.countPerPage;
			if (isLastItemOnPage && state.page > 1) {
				state.page -= 1;
			}
		},
		changePage: (state, { payload }: PayloadAction<number>) => {
			state.page = payload;
		},
		clearFavorites: (state) => {
			state.items = [];
		},
	},
});

export const { clearFavorites, toggleToFavorite, changePage } = favoriteReducer.actions;
export default favoriteReducer.reducer;
