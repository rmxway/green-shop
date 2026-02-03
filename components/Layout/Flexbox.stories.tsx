import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Flexbox } from './Flexbox';

const withBorder = (Story: React.ComponentType) => (
	<div className="sb-layout-debug">
		<Story />
	</div>
);

const meta: Meta<typeof Flexbox> = {
	component: Flexbox,
	decorators: [withBorder],
	title: 'Layout/Flexbox',
};
export default meta;

type Story = StoryObj<typeof Flexbox>;

export const Default: Story = {
	render: (args) => (
		<Flexbox {...args}>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
		</Flexbox>
	),
};
export const WithGap: Story = {
	render: (args) => (
		<Flexbox {...args}>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
		</Flexbox>
	),
	args: { $gap: 10 },
};
export const Centered: Story = {
	render: (args) => (
		<Flexbox {...args}>
			<div>Centered</div>
		</Flexbox>
	),
	args: { $justify: 'center', $align: 'center' },
};
export const Column: Story = {
	render: (args) => (
		<Flexbox {...args}>
			<div>Row 1</div>
			<div>Row 2</div>
		</Flexbox>
	),
	args: { $direction: 'column', $gap: 8 },
};
