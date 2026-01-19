import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from '@/components/ui/Modal';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('Modal:', () => {
	it('Does not render when closed', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Modal open={false} onClose={jest.fn()}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		expect(screen.queryByText('Test content')).not.toBeInTheDocument();
	});

	it('Renders content when open', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={jest.fn()}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('Renders title when provided', () => {
		const testTitle = 'Test Modal Title';

		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={jest.fn()} title={testTitle}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText(testTitle)).toBeInTheDocument();
	});

	it('Does not render title when not provided', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={jest.fn()}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		// Проверяем что нет заголовка (элемента ModalHeader)
		const modalHeader = document.querySelector('[data-testid="modal-header"]');
		expect(modalHeader).not.toBeInTheDocument();
	});

	it('Close button is present and clickable', async () => {
		const user = userEvent.setup();
		const mockOnClose = jest.fn();

		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={mockOnClose}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		// Кнопка закрытия - это элемент с иконкой times-small
		const closeIcon = document.querySelector('.icofont.icofont-times-small');
		expect(closeIcon).toBeInTheDocument();

		if (closeIcon) {
			await user.click(closeIcon);
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		}
	});

	it('Click outside modal calls onClose', () => {
		const mockOnClose = jest.fn();

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={mockOnClose}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		// Находим wrapper (фон) модального окна - первый дочерний элемент контейнера
		const modalWrapper = container.firstChild as HTMLElement;
		expect(modalWrapper).toBeInTheDocument();

		// Клик по wrapper'у должен закрыть модальное окно
		fireEvent.click(modalWrapper);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('Click on modal content does not call onClose', () => {
		const mockOnClose = jest.fn();

		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={mockOnClose}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		const modalContent = screen.getByText('Test content');
		fireEvent.click(modalContent);

		expect(mockOnClose).not.toHaveBeenCalled();
	});

	it('Modal has correct structure', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={jest.fn()} title="Test Title">
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		// Проверяем наличие основных элементов
		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('Test content')).toBeInTheDocument();

		// Проверяем наличие кнопки закрытия
		const closeIcon = document.querySelector('.icofont-times-small');
		expect(closeIcon).toBeInTheDocument();
	});

	it('Multiple children are rendered correctly', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={jest.fn()}>
					<h1>Title</h1>
					<p>Description</p>
					<button type="button">Action</button>
				</Modal>
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('Title')).toBeInTheDocument();
		expect(screen.getByText('Description')).toBeInTheDocument();
		expect(screen.getByText('Action')).toBeInTheDocument();
	});

	it('Modal wrapper has ref attached', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Modal open onClose={jest.fn()}>
					<div>Test content</div>
				</Modal>
			</StyledComponentsRegistry>,
		);

		// Проверяем что wrapper существует
		const modalWrapper = container.firstChild;
		expect(modalWrapper).toBeInTheDocument();
	});
});
