import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Flexbox } from './Flexbox';
import { Space } from './Space';

const withBorder = (Story: React.ComponentType) => (
	<div className="sb-layout-debug">
		<Story />
	</div>
);

const meta: Meta<typeof Space> = {
	component: Space,
	decorators: [withBorder],
	title: 'Layout/Space',
};
export default meta;

type Story = StoryObj<typeof Space>;

export const BetweenElements: Story = {
	render: () => (
		<Flexbox $direction="column" $gap={0}>
			<div>Top</div>
			<Space className="sb-layout-debug" />
			<div>Bottom</div>
		</Flexbox>
	),
};
