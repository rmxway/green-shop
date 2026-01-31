import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { CartState, IProduct, ProductsState } from '@/types';

const typedProductsCreateSelector = createDraftSafeSelector.withTypes<ProductsState>();
const typedCartCreateSelector = createDraftSafeSelector.withTypes<CartState>();

export const currentItemsMemoized = createDraftSafeSelector(
	[
		(state: CartState | ProductsState) => state.page,
		(state: CartState | ProductsState) => state.countPerPage,
		(_: CartState | ProductsState, items: IProduct[]) => items,
	],
	(page, countPerPage, items) => {
		if (!Array.isArray(items) || items.length === 0) return [];
		const startIndex = (page - 1) * countPerPage;
		const endIndex = page * countPerPage;
		return items.slice(startIndex, endIndex);
	},
);

export const productMemoized = typedProductsCreateSelector(
	[(state) => state.reservedItems, (_, id: string) => id],
	(reservedItems, id) => {
		if (!Array.isArray(reservedItems) || !id) return null;
		return reservedItems.find((item) => item.id === Number(id)) || null;
	},
);

export const favoritesItemsMemoized = typedProductsCreateSelector([(state) => state.fetchedItems], (fetchedItems) => {
	if (!Array.isArray(fetchedItems)) return [];
	return fetchedItems.filter((item) => item?.favorite);
});

export const productsSelectorMemoized = typedProductsCreateSelector(
	[(state) => state.fetchedItems, (state) => state.fetching, (state) => state.error],
	(fetchedItems, fetching, error) => ({ fetchedItems, fetching, error }),
);

export const cartItemsCountMemoized = typedCartCreateSelector([(state) => state.items], (items) => {
	if (!Array.isArray(items) || items.length === 0) return 0;
	return items.reduce((acc, cur) => acc + (cur.count || 1), 0);
});

export const filterRelevantSelectorMemoized = typedProductsCreateSelector(
	[(state) => state.reservedItems.length, (state) => state.fetchedItems.length],
	(reservedItemsLength, fetchedItemsLength) => ({
		reservedItemsLength,
		fetchedItemsLength,
	}),
);

export const toggleSortSelectorMemoized = typedProductsCreateSelector(
	[(state) => state.sort, (state) => state.search, (state) => state.categories],
	(sort, search, categories) => ({ sort, search, categories }),
);
