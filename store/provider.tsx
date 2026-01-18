'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/store';
import { resetCurrencyToUSD } from '@/store/reducers/products';

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
	useEffect(() => {
		// Сбрасываем валюту на USD при инициализации приложения
		if (persistor) {
			store.dispatch(resetCurrencyToUSD());
		}
	}, []);

	if (!persistor) {
		return <Provider store={store}>{children}</Provider>;
	}

	return (
		<PersistGate persistor={persistor}>
			<Provider store={store}>{children}</Provider>
		</PersistGate>
	);
};

export default ReduxProvider;
