import { IProduct } from '@/types';

import cartReducer, {
	addToCart,
	changePage,
	changeStep,
	decreaseCount,
	deleteFromCart,
	increaseCount,
	initialState,
	trashAll,
} from './index';

const createProduct = (overrides: Partial<IProduct> = {}): IProduct => ({
	id: 1,
	title: 'Test Plant',
	price: 100,
	description: 'A test plant',
	images: ['plant.jpg'],
	...overrides,
});

describe('cartReducer', () => {
	it('should return initial state', () => {
		expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	describe('addToCart', () => {
		it('should add a product with count 1', () => {
			const product = createProduct();
			const state = cartReducer(initialState, addToCart(product));

			expect(state.items).toHaveLength(1);
			expect(state.items[0].count).toBe(1);
			expect(state.totalPrice).toBe(100);
		});

		it('should add multiple different products', () => {
			const p1 = createProduct({ id: 1, price: 100 });
			const p2 = createProduct({ id: 2, price: 200 });

			let state = cartReducer(initialState, addToCart(p1));
			state = cartReducer(state, addToCart(p2));

			expect(state.items).toHaveLength(2);
			expect(state.totalPrice).toBe(300);
		});
	});

	describe('deleteFromCart', () => {
		it('should remove a product by id', () => {
			const p1 = createProduct({ id: 1, price: 100 });
			const p2 = createProduct({ id: 2, price: 200 });

			let state = cartReducer(initialState, addToCart(p1));
			state = cartReducer(state, addToCart(p2));
			state = cartReducer(state, deleteFromCart(1));

			expect(state.items).toHaveLength(1);
			expect(state.items[0].id).toBe(2);
			expect(state.totalPrice).toBe(200);
		});

		it('should go to previous page when last item on current page is deleted', () => {
			const p1 = createProduct({ id: 1 });
			const p2 = createProduct({ id: 2 });

			let state = cartReducer(initialState, addToCart(p1));
			state = cartReducer(state, addToCart(p2));
			state = { ...state, countPerPage: 1, page: 2 };
			state = cartReducer(state, deleteFromCart(2));

			expect(state.page).toBe(1);
		});
	});

	describe('increaseCount / decreaseCount', () => {
		it('should increase item count', () => {
			const product = createProduct({ id: 1, price: 50 });
			let state = cartReducer(initialState, addToCart(product));

			state = cartReducer(state, increaseCount(1));
			expect(state.items[0].count).toBe(2);
			expect(state.totalPrice).toBe(100);

			state = cartReducer(state, increaseCount(1));
			expect(state.items[0].count).toBe(3);
			expect(state.totalPrice).toBe(150);
		});

		it('should decrease item count but not below 1', () => {
			const product = createProduct({ id: 1, price: 50 });
			let state = cartReducer(initialState, addToCart(product));
			state = cartReducer(state, increaseCount(1));
			state = cartReducer(state, increaseCount(1));

			expect(state.items[0].count).toBe(3);

			state = cartReducer(state, decreaseCount(1));
			expect(state.items[0].count).toBe(2);

			state = cartReducer(state, decreaseCount(1));
			expect(state.items[0].count).toBe(1);

			state = cartReducer(state, decreaseCount(1));
			expect(state.items[0].count).toBe(1);
		});
	});

	describe('trashAll', () => {
		it('should clear all items and reset totalPrice', () => {
			let state = cartReducer(initialState, addToCart(createProduct({ id: 1 })));
			state = cartReducer(state, addToCart(createProduct({ id: 2 })));
			state = cartReducer(state, trashAll());

			expect(state.items).toHaveLength(0);
			expect(state.totalPrice).toBe(0);
		});
	});

	describe('changePage / changeStep', () => {
		it('should update page', () => {
			const state = cartReducer(initialState, changePage(3));
			expect(state.page).toBe(3);
		});

		it('should update step', () => {
			const state = cartReducer(initialState, changeStep(2));
			expect(state.step).toBe(2);
		});
	});
});
