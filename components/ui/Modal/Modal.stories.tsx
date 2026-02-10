import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';

import { Modal } from './index';

const meta: Meta<typeof Modal> = {
	component: Modal,
	title: 'UI/Modal',
};
export default meta;

type Story = StoryObj<typeof Modal>;

function ModalWithButton() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Modal</Button>
			<Modal open={open} onClose={() => setOpen(false)} title="Заголовок">
				Контент модального окна.
			</Modal>
		</>
	);
}

function ModalWithoutTitle() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Modal open={open} onClose={() => setOpen(false)}>
				Только контент
			</Modal>
		</>
	);
}

export const WithButton: Story = {
	render: () => <ModalWithButton />,
};

export const WithoutTitle: Story = {
	render: () => <ModalWithoutTitle />,
};
