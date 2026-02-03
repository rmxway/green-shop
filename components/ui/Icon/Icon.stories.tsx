import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { iconArgType, iconNames } from '@/.storybook/iconOptions';
import { Flexbox } from '@/components/Layout';

import { Icon } from './index';

const meta: Meta<typeof Icon> = {
	argTypes: { icon: iconArgType },
	args: { icon: 'cart' },
	component: Icon,
	title: 'UI/Icon',
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Cart: Story = { args: { icon: 'cart' } };
export const Compare: Story = { args: { icon: 'compare' } };
export const Favorite: Story = { args: { icon: 'favorite' } };
export const Star: Story = { args: { icon: 'star' } };
export const CustomSize: Story = { args: { icon: 'cart', size: 32 } };

export const AllIcons: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<Flexbox $gap={16}>
			{iconNames.map((icon) => (
				<Flexbox key={icon} $direction="column" $align="center" $gap={4}>
					<Icon icon={icon} size={20} />
					<small>{icon}</small>
				</Flexbox>
			))}
		</Flexbox>
	),
};
