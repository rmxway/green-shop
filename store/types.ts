import { makeStore } from '.';

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export const cartStore = (state: RootState) => state.cart;
export const productsStore = (state: RootState) => state.products;
export const currencyStore = (state: RootState) => state.products.currency;
export const compareStore = (state: RootState) => state.compare;
