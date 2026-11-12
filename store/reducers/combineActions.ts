import { store } from '@/store';
import { changeCategory, sortProducts } from '@/store/reducers/products';

const { dispatch } = store;

export const changeCategoryWithSort = (name: string): void => {
	const { products } = store.getState();
	dispatch(changeCategory(name));

	if (products.sort.name !== 'default') {
		const { name: sortName, toggle } = products.sort;
		dispatch(sortProducts({ name: sortName, toggle }));
	}
};
