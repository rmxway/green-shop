import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { iconArgType } from '@/.storybook/iconOptions';
import { Flexbox } from '@/components/Layout';

import { Button } from './index';

const meta: Meta<typeof Button> = {
	argTypes: { icon: iconArgType },
	component: Button,
	title: 'UI/Button',
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: 'Default' } };
export const Primary: Story = { args: { children: 'Primary', $primary: true } };
export const Danger: Story = { args: { children: 'Danger', $danger: true } };
export const Success: Story = { args: { children: 'Success', $success: true } };
export const Dark: Story = { args: { children: 'Dark', $dark: true } };
export const White: Story = { args: { children: 'White', $white: true } };
export const WithIcon: Story = {
	args: { children: 'В корзину', icon: 'cart', $primary: true },
};
export const Disabled: Story = { args: { children: 'Disabled', $primary: true, disabled: true } };

export const AllButtons: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<Flexbox $gap={10} $align="flex-start">
			<Button>Default</Button>
			<Button $primary>Primary</Button>
			<Button $danger>Danger</Button>
			<Button $success>Success</Button>
			<Button $dark>Dark</Button>
			<Button $white>White</Button>
		</Flexbox>
	),
};
