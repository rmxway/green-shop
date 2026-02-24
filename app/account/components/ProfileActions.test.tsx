import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StyledComponentsRegistry } from '@/lib/registry';

import { ProfileActions } from './ProfileActions';

const defaultProps = {
	isEditing: false,
	saving: false,
	hasChanges: false,
	ordersCount: 0,
	onEdit: jest.fn(),
	onCancelEdit: jest.fn(),
	onSave: jest.fn(),
	onLogout: jest.fn(),
};

const renderActions = (props = {}) =>
	render(
		<StyledComponentsRegistry isJest>
			<ProfileActions {...defaultProps} {...props} />
		</StyledComponentsRegistry>,
	);

describe('ProfileActions', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should show edit button when not editing', () => {
		renderActions();
		expect(screen.getByRole('button', { name: /редактировать/i })).toBeInTheDocument();
	});

	it('should call onEdit when edit button clicked', async () => {
		const onEdit = jest.fn();
		const user = userEvent.setup();
		renderActions({ onEdit });

		await user.click(screen.getByRole('button', { name: /редактировать/i }));
		expect(onEdit).toHaveBeenCalledTimes(1);
	});

	it('should show cancel and save buttons when editing', () => {
		renderActions({ isEditing: true });

		expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument();
	});

	it('should disable save button when no changes', () => {
		renderActions({ isEditing: true, hasChanges: false });

		expect(screen.getByRole('button', { name: /сохранить/i })).toBeDisabled();
	});

	it('should enable save button when has changes', () => {
		renderActions({ isEditing: true, hasChanges: true });

		expect(screen.getByRole('button', { name: /сохранить/i })).toBeEnabled();
	});

	it('should disable buttons when saving', () => {
		renderActions({ isEditing: true, saving: true, hasChanges: true });

		expect(screen.getByRole('button', { name: /сохранение…/i })).toBeDisabled();
		expect(screen.getByRole('button', { name: /отмена/i })).toBeDisabled();
	});

	it('should show saving text when saving', () => {
		renderActions({ isEditing: true, saving: true });

		expect(screen.getByText('Сохранение…')).toBeInTheDocument();
	});

	it('should disable orders button when no orders', () => {
		renderActions({ ordersCount: 0 });

		const ordersButton = screen.getByRole('button', { name: /мои заказы/i });
		expect(ordersButton).toBeDisabled();
	});

	it('should render orders button as link when has orders', () => {
		renderActions({ ordersCount: 3 });

		const link = screen.getByRole('link', { name: /мои заказы/i });
		expect(link).toHaveAttribute('href', '/account/orders');
	});

	it('should call onLogout when logout button clicked', async () => {
		const onLogout = jest.fn();
		const user = userEvent.setup();
		renderActions({ onLogout });

		await user.click(screen.getByRole('button', { name: /выйти/i }));
		expect(onLogout).toHaveBeenCalledTimes(1);
	});

	it('should call onCancelEdit when cancel clicked', async () => {
		const onCancelEdit = jest.fn();
		const user = userEvent.setup();
		renderActions({ isEditing: true, onCancelEdit });

		await user.click(screen.getByRole('button', { name: /отмена/i }));
		expect(onCancelEdit).toHaveBeenCalledTimes(1);
	});

	it('should call onSave when save clicked', async () => {
		const onSave = jest.fn();
		const user = userEvent.setup();
		renderActions({ isEditing: true, hasChanges: true, onSave });

		await user.click(screen.getByRole('button', { name: /сохранить/i }));
		expect(onSave).toHaveBeenCalledTimes(1);
	});
});
