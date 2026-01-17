// Утилиты для работы с валютами (без зависимостей от React/hooks)

// Интерфейс для ответа API ЦБ РФ
interface CBRResponse {
	Valute: {
		USD: {
			Value: number;
		};
	};
}

// Курс валюты по умолчанию (fallback)
export const DEFAULT_EXCHANGE_RATE_USD_TO_RUB = 65;

// Кеш для курса валюты
let exchangeRateCache: {
	value: number;
	timestamp: number;
} | null = null;

// Время жизни кеша в миллисекундах (24 часа)
const CACHE_LIFETIME = 60 * 60 * 1000 * 24;

/**
 * Получает актуальный курс USD к RUB из API Центрального Банка РФ
 */
export const fetchExchangeRate = async (): Promise<number> => {
	try {
		// Проверяем кеш
		if (exchangeRateCache && Date.now() - exchangeRateCache.timestamp < CACHE_LIFETIME) {
			return exchangeRateCache.value;
		}

		const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
		const data = await response.json() as CBRResponse;

		// Получаем курс доллара США (USD)
		const usdRate: number = data.Valute.USD.Value;

		if (typeof usdRate !== 'number' || usdRate <= 0) {
			throw new Error('Некорректный курс валюты получен из API');
		}

		// Обновляем кеш
		exchangeRateCache = {
			value: usdRate,
			timestamp: Date.now(),
		};

		return usdRate;
	} catch {
		// В production можно добавить логирование ошибки
		// Возвращаем значение по умолчанию в случае ошибки
		return DEFAULT_EXCHANGE_RATE_USD_TO_RUB;
	}
};

/**
 * Получает текущий курс валюты (из кеша или API)
 */
export const getExchangeRate = async (): Promise<number> => {
	if (exchangeRateCache && Date.now() - exchangeRateCache.timestamp < CACHE_LIFETIME) {
		return exchangeRateCache.value;
	}

	return fetchExchangeRate();
};

// Типы валют
export type Currency = 'USD' | 'RUB';

// Функции для работы с валютами
export const currencyUtils = {
	/**
	 * Конвертирует цену в указанную валюту
	 */
	convertPrice: (price: number, targetCurrency: Currency, exchangeRate?: number): number => {
		if (targetCurrency === 'RUB') {
			const rate = exchangeRate ?? DEFAULT_EXCHANGE_RATE_USD_TO_RUB;
			return Math.round(price * rate);
		}
		return price;
	},

	/**
	 * Конвертирует цену в указанную валюту (асинхронная версия)
	 */
	convertPriceAsync: async (price: number, targetCurrency: Currency): Promise<number> => {
		if (targetCurrency === 'RUB') {
			const rate = await getExchangeRate();
			return Math.round(price * rate);
		}
		return price;
	},

	/**
	 * Форматирует цену согласно Locale валюты
	 */
	formatPrice: (price: number, currency: Currency, exchangeRate?: number): string => {
		const convertedPrice = currencyUtils.convertPrice(price, currency, exchangeRate);
		return currency === 'RUB' ? convertedPrice.toLocaleString('ru-RU') : convertedPrice.toLocaleString('en-US');
	},

	/**
	 * Форматирует цену согласно Locale валюты (асинхронная версия)
	 */
	formatPriceAsync: async (price: number, currency: Currency): Promise<string> => {
		const convertedPrice = await currencyUtils.convertPriceAsync(price, currency);
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
	formatPriceWithSymbol: (price: number, currency: Currency, exchangeRate?: number): string => {
		const formattedPrice = currencyUtils.formatPrice(price, currency, exchangeRate);
		return `${formattedPrice} ${currencyUtils.getCurrencySymbol(currency)}`;
	},

	/**
	 * Форматирует цену с символом валюты (асинхронная версия)
	 */
	formatPriceWithSymbolAsync: async (price: number, currency: Currency): Promise<string> => {
		const formattedPrice = await currencyUtils.formatPriceAsync(price, currency);
		return `${formattedPrice} ${currencyUtils.getCurrencySymbol(currency)}`;
	},
};

export default currencyUtils;
