import { Action, Middleware } from 'redux';

import { ScrollToTop } from '@/services/helpers';
import { addToCart, calculateTotalPrice, decreaseCount, deleteFromCart, increaseCount } from '@/store/reducers/cart';
import { changePage } from '@/store/reducers/products';

const afterChangePageScrollTop: Middleware = () => (next) => (action) => {
	if ((action as Action).type === changePage.type) {
		ScrollToTop();
	}

	return next(action);
};

const calculateCartTotalPrice: Middleware = (state) => (next) => (action) => {
	const result = next(action);
	const actionTypes = [addToCart.type, deleteFromCart.type, increaseCount.type, decreaseCount.type] as string[];
	if (actionTypes.includes((action as Action).type)) {
		state.dispatch({ type: calculateTotalPrice.type });
	}

	return result;
};

export const middlewares = [afterChangePageScrollTop, calculateCartTotalPrice];
