'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import type { AppDispatch, RootState, RootStore } from '@/store/types';
import { currencyStore } from '@/store/types';

import { SCROLL_DELAY_MS } from './constants';
import { currencyUtils, DEFAULT_EXCHANGE_RATE_USD_TO_RUB, getExchangeRate } from './currencyService';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => RootStore = useStore;

/**
 * Навигация со скроллом вверх: при переходе на другую страницу сначала скроллит вверх,
 * затем выполняет переход (с задержкой для анимации).
 */
export const useNavigateWithScroll = () => {
	const pathname = usePathname();
	const router = useRouter();

	return useCallback(
		(url: string) => {
			if (typeof window === 'undefined') return;

			if (window.scrollY === 0) {
				router.push(url);
				return;
			}

			if (pathname === url) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}

			window.scrollTo({ top: 0, behavior: 'smooth' });
			setTimeout(() => router.push(url), SCROLL_DELAY_MS);
		},
		[pathname, router],
	);
};

/**
 * @param isLoading флаг загрузки
 * @param seconds таймаут в секундах
 * @param onTimeout колбэк при срабатывании таймаута (пока загрузка активна)
 */
export const useLoadTimeout = (isLoading: boolean, seconds: number, onTimeout: () => void) => {
	useEffect(() => {
		if (!isLoading) return;

		const timer = setTimeout(() => {
			onTimeout();
		}, seconds * 1000);

		return () => clearTimeout(timer);
	}, [isLoading, seconds, onTimeout]);
};

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

let scrollbarWidthSet = false;

const getScrollbarWidth = (): number => {
	const el = document.createElement('div');
	el.style.cssText = 'visibility:hidden;overflow:scroll;position:absolute;width:100px;height:100px';
	document.body.appendChild(el);
	const width = el.offsetWidth - el.clientWidth;
	el.remove();
	return width;
};

/**
 * Блокирует скролл страницы без скачка (компенсирует ширину скроллбара через padding-right)
 * @param locked - true для блокировки, false для разблокировки
 */
export const useScrollLock = (locked: boolean) => {
	useEffect(() => {
		if (typeof document === 'undefined') return;

		// Устанавливаем CSS-переменную один раз (измерение через элемент со скроллом)
		if (!scrollbarWidthSet) {
			const scrollbarWidth = getScrollbarWidth();
			document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
			scrollbarWidthSet = true;
		}

		// Переключаем класс
		if (locked) {
			document.documentElement.classList.add('scroll-lock');
			document.body.classList.add('scroll-lock');
		} else {
			document.documentElement.classList.remove('scroll-lock');
			document.body.classList.remove('scroll-lock');
		}
	}, [locked]);
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
