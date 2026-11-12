import { Action, Middleware } from 'redux';

import { ScrollToTop } from '@/services/helpers';
import { addToCart, calculateTotalPrice, decreaseCount, increaseCount, removeFromCart } from '@/store/reducers/cart';
import { changePage } from '@/store/reducers/favorite';
import { changePage as favoriteChangePage } from '@/store/reducers/products';

const afterChangePageScrollTop: Middleware = () => (next) => (action) => {
	const condition =
		(action as Action).type === changePage.type || (action as Action).type === favoriteChangePage.type;
	if (condition) {
		ScrollToTop();
	}

	return next(action);
};

const calculateCartTotalPrice: Middleware = (state) => (next) => (action) => {
	const result = next(action);
	const actionTypes = [addToCart.type, removeFromCart.type, increaseCount.type, decreaseCount.type] as string[];
	if (actionTypes.includes((action as Action).type)) {
		state.dispatch({ type: calculateTotalPrice.type });
	}

	return result;
};

export const middlewares = [afterChangePageScrollTop, calculateCartTotalPrice];
