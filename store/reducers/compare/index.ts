import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompareState, IProduct } from '@/types';

import { updateCompareItems } from './helpers';

export const initialState: CompareState = {
	items: [],
	limit: 6,
};

const compareReducer = createSlice({
	name: 'compare',
	initialState,
	reducers: {
		toggleCompare: (state, { payload }: PayloadAction<IProduct>) => {
			state.items = updateCompareItems(state.items, payload, state.limit);
		},
		removeFromCompare: (state, { payload: id }: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== id);
		},
		clearCompare: (state) => {
			state.items = [];
		},
	},
});

const { actions, reducer } = compareReducer;

export const { toggleCompare, removeFromCompare, clearCompare } = actions;

export default reducer;
