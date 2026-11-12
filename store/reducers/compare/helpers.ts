import { IProduct } from '@/types';

export const updateCompareItems = (items: IProduct[], product: IProduct, limit: number): IProduct[] => {
	const existingIndex = items.findIndex((item) => item.id === product.id);

	// Если товар уже есть - удаляем его
	if (existingIndex !== -1) {
		return items.filter((item) => item.id !== product.id);
	}

	// Если достигнут лимит - удаляем первый (самый старый)
	if (items.length >= limit) {
		const newItems = [...items];
		newItems.shift(); // Удаляем первый элемент
		newItems.push(product); // Добавляем новый
		return newItems;
	}

	// Просто добавляем новый товар
	return [...items, product];
};
