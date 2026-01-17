// Утилиты для работы с валютами (без зависимостей от React/hooks)

// Курс валюты (можно вынести в константы или получать из API)
export const EXCHANGE_RATE_USD_TO_RUB = 65;

// Типы валют
export type Currency = 'USD' | 'RUB';

// Функции для работы с валютами
export const currencyUtils = {
	/**
	 * Конвертирует цену в указанную валюту
	 */
	convertPrice: (price: number, targetCurrency: Currency): number =>
		targetCurrency === 'RUB' ? Math.round(price * EXCHANGE_RATE_USD_TO_RUB) : price,

	/**
	 * Форматирует цену согласно Locale валюты
	 */
	formatPrice: (price: number, currency: Currency): string => {
		const convertedPrice = currencyUtils.convertPrice(price, currency);
		return currency === 'RUB' ? convertedPrice.toLocaleString('ru-RU') : convertedPrice.toLocaleString('en-US');
	},

	/**
	 * Возвращает символ валюты
	 */
	getCurrencySymbol: (currency: Currency): string => (currency === 'RUB' ? '₽' : '$'),

	/**
	 * Возвращает полное название валюты
	 */
	getCurrencyName: (currency: Currency): string => (currency === 'RUB' ? 'рубль' : 'доллар'),

	/**
	 * Форматирует цену с символом валюты
	 */
	formatPriceWithSymbol: (price: number, currency: Currency): string =>
		`${currencyUtils.formatPrice(price, currency)} ${currencyUtils.getCurrencySymbol(currency)}`,
};

export default currencyUtils;
