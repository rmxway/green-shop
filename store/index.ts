import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { VERSION } from '@/services';
import { api } from '@/store/api';
import CartReducer from '@/store/reducers/cart';
import ProductsReducer from '@/store/reducers/products';

import { middlewares } from './thunks';

const createNoopStorage = () => ({
	getItem(key: string): Promise<string | null> {
		return Promise.resolve(key);
	},
	setItem(key: string, item: string): Promise<string> {
		return Promise.resolve(item);
	},
	removeItem() {
		return Promise.resolve();
	},
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
	key: 'wholeStore',
	storage,
	version: +VERSION,
};

const appReducer = combineReducers({
	products: ProductsReducer,
	cart: CartReducer,
	[api.reducerPath]: api.reducer,
});

const rootReducer = (state: ReturnType<typeof appReducer>, action: Action) => {
	switch (action.type) {
		case 'store/clear':
			if (typeof window !== 'undefined') {
				localStorage.removeItem('persist:wholeStore');
			}
			return undefined;
		default:
			return appReducer(state, action);
	}
};

const persistedReducers = persistReducer(persistConfig, rootReducer as typeof appReducer);

export const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
			},
		}).concat(api.middleware, ...middlewares),
});

export const persistor = persistStore(store);

export const makeStore = () => store;
