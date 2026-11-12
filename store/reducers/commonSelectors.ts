import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { CartState, FavoriteState, IProduct, ProductsState } from '@/types';

const typedProductsCreateSelector = createDraftSafeSelector.withTypes<ProductsState>();
const typedCartCreateSelector = createDraftSafeSelector.withTypes<CartState>();

type CommonState = ProductsState | CartState | FavoriteState;

/**
 * @description Текущие элементы на выбранной странице. Универсальный селектор для товаров и корзины
 */
export const currentItemsMemoized = createDraftSafeSelector.withTypes<CommonState>()(
	[(state) => state.page, (state) => state.countPerPage, (_, items: IProduct[]) => items],
	(page, countPerPage, items) => {
		if (!Array.isArray(items) || items.length === 0) return [];
		const startIndex = (page - 1) * countPerPage;
		const endIndex = page * countPerPage;
		return items.slice(startIndex, endIndex);
	},
);

/**
 * @description Поиск продукта по id
 */
export const productByIdMemoized = typedProductsCreateSelector(
	[(state) => state.fetchedItems, (_, id: number) => id],
	(fetchedItems, id) => {
		if (!Array.isArray(fetchedItems) || !id) return null;
		return fetchedItems.find((item) => item.id === id) || null;
	},
);

/**
 * @description Кол-во count на опр. элементе
 */
export const countByIdMemoized = typedCartCreateSelector(
	[(state) => state.items, (_, id: number) => id],
	(items, id) => {
		if (!Array.isArray(items) || !id) return null;
		return items.find((item) => item.id === id)?.count || null;
	},
);

/**
 * @description общее кол-во товаров учитывая кол-во позиций каждого товара
 */
export const cartItemsCountMemoized = typedCartCreateSelector([(state) => state.items], (items) => {
	if (!Array.isArray(items) || items.length === 0) return 0;
	return items.reduce((acc, cur) => acc + (cur.count || 1), 0);
});

export const isItemMemoized = createDraftSafeSelector(
	[(state) => state.items, (_, id: number) => id],
	(items, id) => {
		if (!Array.isArray(items) || !id) return false;
		return items.some((item) => item.id === id);
	},
);
