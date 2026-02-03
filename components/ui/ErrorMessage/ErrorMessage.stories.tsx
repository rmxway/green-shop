import type { Meta, StoryObj } from '@storybook/react';

import { ErrorMessage } from './index';

const meta: Meta<typeof ErrorMessage> = {
	component: ErrorMessage,
	title: 'UI/ErrorMessage',
};
export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = { args: { error: 'Обязательное поле' } };
