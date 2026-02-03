import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Flexbox } from '@/components/Layout';

import { Sticker } from './index';

const meta: Meta<typeof Sticker> = {
	component: Sticker,
	title: 'UI/Sticker',
};
export default meta;

type Story = StoryObj<typeof Sticker>;

export const Default: Story = { args: { children: 'Default' } };
export const Primary: Story = { args: { children: 'Primary', $primary: true } };
export const Danger: Story = { args: { children: 'Danger', $danger: true } };
export const Dark: Story = { args: { children: 'Dark', $dark: true } };
export const Success: Story = { args: { children: 'Success', $success: true } };

export const AllStickers: Story = {
	render: () => (
		<Flexbox $gap={10} $align="center">
			<Sticker>Default</Sticker>
			<Sticker $primary>Primary</Sticker>
			<Sticker $danger>Danger</Sticker>
			<Sticker $dark>Dark</Sticker>
			<Sticker $success>Success</Sticker>
		</Flexbox>
	),
};
