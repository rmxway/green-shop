import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { api } from '@/store/api';
import CartReducer from '@/store/reducers/cart';
import CompareReducer from '@/store/reducers/compare';
import FavoriteReducer from '@/store/reducers/favorite';
import ProductsReducer from '@/store/reducers/products';
import { defaultTheme, GlobalStyles } from '@/theme';

import { TemplateProps } from './template';

// Создаем отдельный store для тестов без проблемных middleware
const appReducer = combineReducers({
	products: ProductsReducer,
	cart: CartReducer,
	favorite: FavoriteReducer,
	compare: CompareReducer,
	[api.reducerPath]: api.reducer,
});

const testStore = configureStore({
	reducer: appReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export const JestTemplate = ({ children }: TemplateProps) => (
	<Provider store={testStore}>
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	</Provider>
);

export default JestTemplate;
