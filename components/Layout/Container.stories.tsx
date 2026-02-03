import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Container } from './Container';

const withBorder = (Story: React.ComponentType) => (
	<div className="sb-layout-debug">
		<Story />
	</div>
);

const meta: Meta<typeof Container> = {
	component: Container,
	decorators: [withBorder],
	title: 'Layout/Container',
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
	render: (args) => <Container {...args}>Content inside container</Container>,
};
export const WithPaddingTop: Story = {
	render: (args) => <Container {...args}>Content with padding-top</Container>,
	args: { $pt: true },
};
export const WithPaddingBottom: Story = {
	render: (args) => <Container {...args}>Content with padding-bottom</Container>,
	args: { $pb: true },
};
export const Flex: Story = {
	render: (args) => (
		<Container {...args}>
			<div>Item 1</div>
			<div>Item 2</div>
		</Container>
	),
	args: { $flex: true },
};
