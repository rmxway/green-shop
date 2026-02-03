import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { ReduxProvider } from '@/store/provider';

import { ProductCard } from './index';
import { mockProduct } from './mockProduct';

const CardWrapper = styled.div`
	width: 300px;
`;

const withRedux = (Story: React.ComponentType) => (
	<ReduxProvider>
		<Story />
	</ReduxProvider>
);

const withWidth = (Story: React.ComponentType) => (
	<CardWrapper>
		<Story />
	</CardWrapper>
);

const meta: Meta<typeof ProductCard> = {
	component: ProductCard,
	decorators: [withWidth, withRedux],
	title: 'Components/ProductCard',
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

const product = { ...mockProduct, favorite: false, checked: false };

export const Default: Story = { args: { product } };
export const InCart: Story = { args: { product: { ...product, checked: true } } };
export const Favorite: Story = { args: { product: { ...product, favorite: true } } };
