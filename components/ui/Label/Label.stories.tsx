import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './index';

const meta: Meta<typeof Label> = {
	component: Label,
	title: 'UI/Label',
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = { args: { name: 'email', label: 'Email' } };
