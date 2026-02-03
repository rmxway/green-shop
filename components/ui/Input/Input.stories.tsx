import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

const meta: Meta<typeof Input> = {
	component: Input,
	title: 'UI/Input',
	args: { name: 'field' },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Введите текст' } };
export const WithLabel: Story = {
	args: { label: 'Название поля', placeholder: 'Введите значение' },
};
export const WithError: Story = {
	args: { label: 'Поле с ошибкой', error: 'Обязательное поле', placeholder: 'Текст' },
};
export const Success: Story = {
	args: { label: 'Успешно заполнено', success: true, defaultValue: 'Значение' },
};
