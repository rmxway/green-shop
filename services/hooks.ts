'use client';

import { useEffect, useMemo, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import type { AppDispatch, RootState, RootStore } from '@/store/types';
import { currencyStore } from '@/store/types';

import { currencyUtils, DEFAULT_EXCHANGE_RATE_USD_TO_RUB, getExchangeRate } from './currencyService';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => RootStore = useStore;

/**
 * Observable screen width breakpoints and if matched return a boolean value
 * @param {string}query - string
 * @returns boolean
 * @example const match = useMediaQuery('1024px') // return true if screen width from 0 to 1024 px
 */
export const useMediaQuery = (query: string) => {
	const mediaQuery = useMemo(
		() => (typeof window !== 'undefined' ? window.matchMedia(`(max-width: ${query})`) : undefined),
		[query],
	);
	const [match, setMatch] = useState(mediaQuery?.matches);

	useEffect(() => {
		const onChange = () => setMatch(mediaQuery?.matches);
		mediaQuery?.addEventListener('change', onChange);

		return () => mediaQuery?.removeEventListener('change', onChange);
	}, [mediaQuery]);

	return match;
};

/**
 * Хук для работы с текущей валютой
 */
export const useCurrency = () => {
	const currency = useAppSelector(currencyStore);
	const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_EXCHANGE_RATE_USD_TO_RUB);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		(async () => {
			if (currency === 'RUB') {
				setIsLoading(true);
				try {
					const rate = await getExchangeRate();
					setExchangeRate(rate);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Ошибка загрузки курса валюты:', error);
				} finally {
					setIsLoading(false);
				}
			}
		})();
	}, [currency]);

	// Создаем синхронные функции с использованием загруженного курса
	const convertPriceSync = (price: number): number =>
		currencyUtils.convertPrice(price, currency, exchangeRate);

	const formatPriceSync = (price: number): string =>
		currencyUtils.formatPrice(price, currency, exchangeRate);

	const formatPriceWithSymbolSync = (price: number): string =>
		currencyUtils.formatPriceWithSymbol(price, currency, exchangeRate);

	return {
		currency,
		isLoading,
		exchangeRate,
		convertPrice: convertPriceSync,
		formatPrice: formatPriceSync,
		formatPriceWithSymbol: formatPriceWithSymbolSync,
		getCurrencySymbol: () => currencyUtils.getCurrencySymbol(currency),
		getCurrencyName: () => currencyUtils.getCurrencyName(currency),
	};
};

export default useMediaQuery;
