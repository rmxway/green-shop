import type { Meta, StoryObj } from '@storybook/react';

import { Switcher } from './index';

const meta: Meta<typeof Switcher> = {
	component: Switcher,
	title: 'UI/Switcher',
	args: { name: 'toggle' },
};
export default meta;

type Story = StoryObj<typeof Switcher>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Включить опцию' } };
export const WithError: Story = { args: { label: 'Опция', error: 'Выберите значение' } };
