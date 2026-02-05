import type { Meta, StoryObj } from '@storybook/react';

import { GradientText } from './index';

const meta: Meta<typeof GradientText> = {
	component: GradientText,
	title: 'UI/GradientText',
};
export default meta;

type Story = StoryObj<typeof GradientText>;

export const Main: Story = { args: { children: 'Gradient Text', gradient: 'main' } };
export const Dark: Story = { args: { children: 'Dark Gradient', gradient: 'dark' } };
export const SoftDark: Story = { args: { children: 'Soft Dark', gradient: 'softDark' } };
export const CustomSize: Story = { args: { children: 'Size 24px', size: 24 } };
