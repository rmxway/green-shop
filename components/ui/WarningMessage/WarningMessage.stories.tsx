import type { Meta, StoryObj } from '@storybook/react';

import { WarningMessage } from './index';

const meta: Meta<typeof WarningMessage> = {
	component: WarningMessage,
	title: 'UI/WarningMessage',
};
export default meta;

type Story = StoryObj<typeof WarningMessage>;

export const Default: Story = { args: { message: 'Проверьте введённые данные' } };
