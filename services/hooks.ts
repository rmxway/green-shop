'use client';

import { useEffect, useMemo, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import type { AppDispatch, RootState, RootStore } from '@/store/types';
import { currencyStore } from '@/store/types';

import { currencyUtils } from './currencyService';

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

	return {
		currency,
		convertPrice: (price: number) => currencyUtils.convertPrice(price, currency),
		formatPrice: (price: number) => currencyUtils.formatPrice(price, currency),
		formatPriceWithSymbol: (price: number) => currencyUtils.formatPriceWithSymbol(price, currency),
		getCurrencySymbol: () => currencyUtils.getCurrencySymbol(currency),
		getCurrencyName: () => currencyUtils.getCurrencyName(currency),
	};
};

export default useMediaQuery;
