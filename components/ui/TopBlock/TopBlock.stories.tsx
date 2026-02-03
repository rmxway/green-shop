import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ReduxProvider } from '@/store/provider';

import { TopBlock } from './index';

const withRedux = (Story: React.ComponentType) => (
	<ReduxProvider>
		<Story />
	</ReduxProvider>
);

const meta: Meta<typeof TopBlock> = {
	component: TopBlock,
	title: 'UI/TopBlock',
	decorators: [withRedux],
};
export default meta;

type Story = StoryObj<typeof TopBlock>;

export const Default: Story = {};
