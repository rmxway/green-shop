import type { Meta, StoryObj } from '@storybook/react';

import { iconArgType } from '@/.storybook/iconOptions';

import { LinkIcon } from './index';

const meta: Meta<typeof LinkIcon> = {
	argTypes: { icon: iconArgType },
	component: LinkIcon,
	title: 'UI/LinkIcon',
};
export default meta;

type Story = StoryObj<typeof LinkIcon>;

export const WithIcon: Story = { args: { icon: 'cart' } };
export const WithText: Story = { args: { icon: 'cart', children: 'Корзина' } };
export const Close: Story = { args: { icon: 'times-small' } };
