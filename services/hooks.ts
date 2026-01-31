'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

// Глобальное состояние для курса валюты
let globalExchangeRate = DEFAULT_EXCHANGE_RATE_USD_TO_RUB;
let globalIsLoading = true;
const subscribers: Set<(rate: number, loading: boolean) => void> = new Set();
let isInitialized = false;

/**
 * Уведомляет всех подписчиков об изменении состояния
 */
const notifySubscribers = () => {
	subscribers.forEach((callback) => callback(globalExchangeRate, globalIsLoading));
};

/**
 * Инициализирует загрузку курса валюты один раз на все приложение
 */
const initializeExchangeRate = async () => {
	if (isInitialized) return;

	isInitialized = true;
	globalIsLoading = true;
	notifySubscribers();

	try {
		const rate = await getExchangeRate();
		globalExchangeRate = rate;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Ошибка загрузки курса валюты:', error);
	} finally {
		globalIsLoading = false;
		notifySubscribers();
	}
};

/**
 * Хук для получения курса валюты (глобальный для всего приложения)
 */
export const useExchangeRate = (): { exchangeRate: number; isLoading: boolean } => {
	const [exchangeRate, setExchangeRate] = useState(globalExchangeRate);
	const [isLoading, setIsLoading] = useState(globalIsLoading);

	const callback = useCallback((rate: number, loading: boolean) => {
		setExchangeRate(rate);
		setIsLoading(loading);
	}, []);

	useEffect(() => {
		// Инициализируем загрузку при первом использовании
		initializeExchangeRate();

		// Подписываемся на изменения
		subscribers.add(callback);

		// Отписываемся при размонтировании
		return () => {
			subscribers.delete(callback);
		};
	}, [callback]);

	return useMemo(() => ({ exchangeRate, isLoading }), [exchangeRate, isLoading]);
};

/**
 * Хук для работы с текущей валютой
 */
export const useCurrency = () => {
	const currency = useAppSelector(currencyStore);
	const { exchangeRate, isLoading } = useExchangeRate();

	// Мемоизируем функции для предотвращения лишних ререндеров
	const convertPrice = useCallback(
		(price: number): number => currencyUtils.convertPrice(price, currency, exchangeRate),
		[currency, exchangeRate],
	);

	const formatPrice = useCallback(
		(price: number): string => currencyUtils.formatPrice(price, currency, exchangeRate),
		[currency, exchangeRate],
	);

	const formatPriceWithoutLocale = useCallback(
		(price: number): number => currencyUtils.formatPriceWithoutLocale(price, currency, exchangeRate),
		[currency, exchangeRate],
	);

	const formatPriceWithSymbol = useCallback(
		(price: number): string => currencyUtils.formatPriceWithSymbol(price, currency, exchangeRate),
		[currency, exchangeRate],
	);

	const getCurrencySymbol = useCallback(() => currencyUtils.getCurrencySymbol(currency), [currency]);

	const getCurrencyName = useCallback(() => currencyUtils.getCurrencyName(currency), [currency]);

	// Возвращаем мемоизированный объект
	return useMemo(
		() => ({
			currency,
			isLoading,
			exchangeRate,
			convertPrice,
			formatPrice,
			formatPriceWithSymbol,
			formatPriceWithoutLocale,
			getCurrencySymbol,
			getCurrencyName,
		}),
		[
			currency,
			isLoading,
			exchangeRate,
			convertPrice,
			formatPrice,
			formatPriceWithSymbol,
			formatPriceWithoutLocale,
			getCurrencySymbol,
			getCurrencyName,
		],
	);
};

export default useMediaQuery;
