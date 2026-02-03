import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './index';

const meta: Meta<typeof Loader> = {
	component: Loader,
	title: 'UI/Loader',
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Loading: Story = { args: { loading: true } };
export const NotLoading: Story = { args: { loading: false } };
