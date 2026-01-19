import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { api } from '@/store/api';
import CartReducer from '@/store/reducers/cart';
import ProductsReducer from '@/store/reducers/products';
import { defaultTheme, GlobalStyles } from '@/theme';

import { TemplateProps } from './template';

// Создаем отдельный store для тестов без проблемных middleware
const testStore = configureStore({
	reducer: {
		products: ProductsReducer,
		cart: CartReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
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
