'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { darkTheme, defaultTheme, GlobalStyles } from '@/theme';

export type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
}

const THEME_STORAGE_KEY = 'green-shop-theme';

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

interface ThemeModeProviderProps {
	children: ReactNode;
}

export const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
	const [mode, setModeState] = useState<ThemeMode>('light');

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;

		if (stored === 'light' || stored === 'dark') {
			setModeState(stored);
		}
	}, []);

	const setMode = useCallback((nextMode: ThemeMode) => {
		setModeState(nextMode);

		if (typeof window !== 'undefined') {
			window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
		}
	}, []);

	const toggleMode = useCallback(() => {
		setMode(mode === 'light' ? 'dark' : 'light');
	}, [mode, setMode]);

	const theme: DefaultTheme = mode === 'dark' ? darkTheme : defaultTheme;

	const value = useMemo<ThemeModeContextValue>(() => ({ mode, setMode, toggleMode }), [mode, setMode, toggleMode]);

	return (
		<ThemeModeContext.Provider value={value}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				{children}
			</ThemeProvider>
		</ThemeModeContext.Provider>
	);
};

export const useThemeMode = () => {
	const context = useContext(ThemeModeContext);

	if (!context) {
		throw new Error('useThemeMode must be used within ThemeModeProvider');
	}

	return context;
};
