import { IProduct } from '@/types';

export interface Characteristic {
	key: string;
	label: string;
	getValue: (product: IProduct) => string | number | undefined;
}

export const characteristics: Characteristic[] = [
	{ key: 'brand', label: 'Бренд', getValue: (p) => p.brand },
	{ key: 'rating', label: 'Рейтинг', getValue: (p) => p.rating },
	{ key: 'price', label: 'Цена', getValue: (p) => p.price },
	{ key: 'discountPercentage', label: 'Скидка, %', getValue: (p) => p.discountPercentage },
	{ key: 'category', label: 'Категория', getValue: (p) => p.category },
	{ key: 'weight', label: 'Вес, г', getValue: (p) => p.weight },
	{
		key: 'dimensions',
		label: 'Размеры (Ш×В×Г)',
		getValue: (p) =>
			p.dimensions ? `${p.dimensions.width}×${p.dimensions.height}×${p.dimensions.depth}` : undefined,
	},
	{ key: 'warrantyInformation', label: 'Гарантия', getValue: (p) => p.warrantyInformation },
	{ key: 'shippingInformation', label: 'Доставка', getValue: (p) => p.shippingInformation },
	{ key: 'availabilityStatus', label: 'Наличие', getValue: (p) => p.availabilityStatus },
	{ key: 'returnPolicy', label: 'Возврат', getValue: (p) => p.returnPolicy },
	{ key: 'minimumOrderQuantity', label: 'Мин. количество', getValue: (p) => p.minimumOrderQuantity },
];

export const getCharacteristics = (product: IProduct): Record<string, string | number | undefined> => {
	const result: Record<string, string | number | undefined> = {};
	characteristics.forEach((char) => {
		result[char.key] = char.getValue(product);
	});
	return result;
};

export const highlightDifferences = (products: IProduct[], key: string): boolean => {
	const values = products.map((product) => {
		const char = characteristics.find((c) => c.key === key);
		return char ? char.getValue(product) : undefined;
	});

	const uniqueValues = new Set(values.filter((v) => v !== undefined));
	return uniqueValues.size > 1;
};

export const formatValue = (value: string | number | undefined): string => {
	if (value === undefined || value === null) return '—';
	if (typeof value === 'number') return value.toString();
	return value;
};
