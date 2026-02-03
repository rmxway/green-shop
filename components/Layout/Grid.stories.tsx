import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Grid } from './Grid';

const withBorder = (Story: React.ComponentType) => (
	<div className="sb-layout-debug">
		<Story />
	</div>
);

const meta: Meta<typeof Grid> = {
	component: Grid,
	decorators: [withBorder],
	title: 'Layout/Grid',
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	render: (args) => (
		<Grid {...args}>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
		</Grid>
	),
};
export const ThreeColumns: Story = {
	render: (args) => (
		<Grid {...args}>
			<div>Col 1</div>
			<div>Col 2</div>
			<div>Col 3</div>
		</Grid>
	),
	args: { $templateColumns: '1fr 1fr 1fr', $gap: 16 },
};
