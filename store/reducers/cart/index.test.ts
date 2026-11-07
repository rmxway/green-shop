import { testCartStore } from '@/store';
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
	count: 1,
	...overrides,
});

let store = testCartStore();

const { dispatch } = store;

describe('cartReducer', () => {
	it('should return initial state', () => {
		expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	describe('addToCart', () => {
		beforeEach(() => {
			dispatch(trashAll());
		});
		it('should add a product with count 1', () => {
			const product = createProduct();

			dispatch(addToCart(product));
			const state = store.getState();

			expect(state.items).toHaveLength(1);
			expect(state.items[0].count).toBe(1);
			expect(state.totalPrice).toBe(100);
		});

		it('should add multiple different products', () => {
			const p1 = createProduct({ id: 1, price: 100 });
			const p2 = createProduct({ id: 2, price: 200 });

			dispatch(addToCart(p1));
			dispatch(addToCart(p2));
			const state = store.getState();

			expect(state.items).toHaveLength(2);
			expect(state.totalPrice).toBe(300);
		});
	});

	describe('deleteFromCart', () => {
		beforeEach(() => {
			dispatch(trashAll());
		});
		it('should remove a product by id', () => {
			const p1 = createProduct({ id: 1, price: 100 });
			const p2 = createProduct({ id: 2, price: 200 });

			dispatch(addToCart(p1));
			dispatch(addToCart(p2));
			dispatch(deleteFromCart(1));
			const state = store.getState();

			expect(state.items).toHaveLength(1);
			expect(state.items[0].id).toBe(2);
			expect(state.totalPrice).toBe(200);
		});

		it('should go to previous page when last item on current page is deleted', () => {
			const p1 = createProduct({ id: 1 });
			const p2 = createProduct({ id: 2 });
			let state = { ...store.getState(), countPerPage: 1, page: 2 };

			dispatch(addToCart(p1));
			dispatch(addToCart(p2));
			dispatch(deleteFromCart(2));

			state = store.getState();

			expect(state.page).toBe(1);
		});
	});

	describe('increaseCount / decreaseCount', () => {
		beforeEach(() => {
			dispatch(trashAll());
		});
		it('should increase item count', () => {
			const product = createProduct({ id: 1, price: 50 });

			dispatch(addToCart(product));
			dispatch(increaseCount(1));
			let state = store.getState();

			expect(state.items[0].count).toBe(2);
			expect(state.totalPrice).toBe(100);

			dispatch(increaseCount(1));

			state = store.getState();

			expect(state.items[0].count).toBe(3);
			expect(state.totalPrice).toBe(150);
		});

		it('should decrease item count but not below 1', () => {
			const product = createProduct({ id: 1, price: 50 });

			dispatch(addToCart(product));
			dispatch(increaseCount(1));
			dispatch(increaseCount(1));
			let state = store.getState();

			expect(state.items[0].count).toBe(3);

			dispatch(decreaseCount(1));
			state = store.getState();
			expect(state.items[0].count).toBe(2);

			dispatch(decreaseCount(1));
			state = store.getState();
			expect(state.items[0].count).toBe(1);

			dispatch(decreaseCount(1));
			state = store.getState();
			expect(state.items[0].count).toBe(1);
		});
	});

	describe('trashAll', () => {
		it('should clear all items and reset totalPrice', () => {
			const p1 = createProduct({ id: 1 });
			const p2 = createProduct({ id: 2 });

			dispatch(addToCart(p1));
			dispatch(addToCart(p2));
			dispatch(trashAll());

			const state = store.getState();

			expect(state.items).toHaveLength(0);
			expect(state.totalPrice).toBe(0);
		});
	});

	describe('changePage / changeStep', () => {
		it('should update page', () => {
			dispatch(changePage(3));
			const state = store.getState();

			expect(state.page).toBe(3);
		});

		it('should update step', () => {
			dispatch(changeStep(2));
			const state = store.getState();

			expect(state.step).toBe(2);
		});
	});
});
