import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PRODUCTS_LIMIT, protocol } from '@/services/constants';
import { getHost } from '@/services/domainData';
import { IProduct } from '@/services/interfaces';

export type ProductsApiResponse = IProduct[];

export interface ResponseProducts {
	data: IProduct[];
	categories: string[];
}

export const api = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${protocol}://${getHost}/api/`,
	}),
	tagTypes: ['Products', 'Product'],
	endpoints: (builder) => ({
		getProducts: builder.query<ResponseProducts, void | null>({
			query: () => ({
				url: 'products',
				params: {
					limit: PRODUCTS_LIMIT,
				},
			}),
			providesTags: ['Products'],
			transformResponse: (data: ProductsApiResponse): ResponseProducts => {
				const categories = [...new Set(data.map((item) => item.category || ''))];
				categories.unshift('all');

				return {
					data,
					categories,
				};
			},
		}),
		getProduct: builder.query<IProduct, string>({
			query: (id) => `products/${id}`,
			providesTags: ['Product'],
		}),
	}),
});

export const { useGetProductsQuery, useGetProductQuery } = api;
