import compareReducer, { clearCompare, initialState, removeFromCompare, toggleCompare } from './index';

describe('compareReducer', () => {
	const mockProduct1 = {
		id: 1,
		title: 'Product 1',
		price: 100,
		images: ['image1.jpg'],
		description: 'Test product 1',
	};

	const mockProduct2 = {
		id: 2,
		title: 'Product 2',
		price: 200,
		images: ['image2.jpg'],
		description: 'Test product 2',
	};

	const mockProduct3 = {
		id: 3,
		title: 'Product 3',
		price: 300,
		images: ['image3.jpg'],
		description: 'Test product 3',
	};

	it('should return initial state', () => {
		expect(compareReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should add product to compare', () => {
		const state = compareReducer(initialState, toggleCompare(mockProduct1));
		expect(state.items).toHaveLength(1);
		expect(state.items[0]).toEqual(mockProduct1);
	});

	it('should remove product from compare when toggled twice', () => {
		let state = compareReducer(initialState, toggleCompare(mockProduct1));
		state = compareReducer(state, toggleCompare(mockProduct1));
		expect(state.items).toHaveLength(0);
	});

	it('should handle multiple products', () => {
		let state = compareReducer(initialState, toggleCompare(mockProduct1));
		state = compareReducer(state, toggleCompare(mockProduct2));
		state = compareReducer(state, toggleCompare(mockProduct3));
		expect(state.items).toHaveLength(3);
	});

	it('should respect limit of 6 products (FIFO)', () => {
		let state = initialState;
		const products = Array.from({ length: 7 }, (_, i) => ({
			id: i + 1,
			title: `Product ${i + 1}`,
			price: (i + 1) * 100,
			images: [`image${i + 1}.jpg`],
			description: `Test product ${i + 1}`,
		}));

		products.forEach((product) => {
			state = compareReducer(state, toggleCompare(product));
		});

		expect(state.items).toHaveLength(6);
		expect(state.items[0].id).toBe(2); // First item should be removed
		expect(state.items[5].id).toBe(7); // Last item should be the 7th product
	});

	it('should remove specific product from compare', () => {
		let state = compareReducer(initialState, toggleCompare(mockProduct1));
		state = compareReducer(state, toggleCompare(mockProduct2));
		state = compareReducer(state, removeFromCompare(1));
		expect(state.items).toHaveLength(1);
		expect(state.items[0].id).toBe(2);
	});

	it('should clear all products from compare', () => {
		let state = compareReducer(initialState, toggleCompare(mockProduct1));
		state = compareReducer(state, toggleCompare(mockProduct2));
		state = compareReducer(state, clearCompare());
		expect(state.items).toHaveLength(0);
	});
});
