import type { Meta, StoryObj } from '@storybook/react';

import { RatingStars } from './index';

const meta: Meta<typeof RatingStars> = {
	component: RatingStars,
	title: 'Layout/RatingStars',
};
export default meta;

type Story = StoryObj<typeof RatingStars>;

export const Zero: Story = { args: { rating: 0 } };
export const Three: Story = { args: { rating: 3 } };
export const Five: Story = { args: { rating: 5 } };
export const Half: Story = { args: { rating: 2.5 } };
