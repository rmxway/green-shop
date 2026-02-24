import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signOut, useSession } from 'next-auth/react';

import { StyledComponentsRegistry } from '@/lib/registry';

import { AccountContent } from './content';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: mockPush }),
	useServerInsertedHTML: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
	signOut: jest.fn(),
	useSession: jest.fn(),
}));

global.fetch = jest.fn();

const mockUser = {
	id: 'u1',
	email: 'test@test.com',
	name: 'Мария',
	surname: 'Иванова',
	phone: '+7 (999) 123-45-67',
	deliveryAddress: 'ул. Главная, 1',
};

const renderAccount = () =>
	render(
		<StyledComponentsRegistry isJest>
			<AccountContent />
		</StyledComponentsRegistry>,
	);

describe('AccountContent', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ orders: [] }),
		});
	});

	it('should redirect to /login when unauthenticated', () => {
		(useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });
		renderAccount();

		expect(mockPush).toHaveBeenCalledWith('/login');
	});

	it('should show loader while loading', () => {
		(useSession as jest.Mock).mockReturnValue({ status: 'loading', data: null });
		const { container } = renderAccount();

		const spans = container.querySelectorAll('span');
		expect(spans.length).toBeGreaterThanOrEqual(4);
	});

	it('should render nothing when no session user', () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: null },
		});
		const { container } = renderAccount();

		expect(container.firstChild).toBeNull();
	});

	it('should display user profile info', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
			update: jest.fn(),
		});
		renderAccount();

		await waitFor(() => {
			expect(screen.getByText(/Добро пожаловать, Мария/)).toBeInTheDocument();
			expect(screen.getByText('test@test.com')).toBeInTheDocument();
		});
	});

	it('should display profile fields', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
			update: jest.fn(),
		});
		renderAccount();

		await waitFor(() => {
			expect(screen.getByText('Мария')).toBeInTheDocument();
			expect(screen.getByText('Иванова')).toBeInTheDocument();
			expect(screen.getByText('+7 (999) 123-45-67')).toBeInTheDocument();
			expect(screen.getByText('ул. Главная, 1')).toBeInTheDocument();
		});
	});

	it('should call signOut and redirect on logout', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
			update: jest.fn(),
		});
		(signOut as jest.Mock).mockResolvedValue(undefined);

		const user = userEvent.setup();
		renderAccount();

		const logoutButton = screen.getByRole('button', { name: /выйти/i });
		await user.click(logoutButton);

		await waitFor(() => {
			expect(signOut).toHaveBeenCalledWith({ redirect: false });
			expect(mockPush).toHaveBeenCalledWith('/');
		});
	});

	it('should show edit button and switch to edit mode', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
			update: jest.fn(),
		});

		const user = userEvent.setup();
		renderAccount();

		const editButton = screen.getByRole('button', { name: /редактировать/i });
		await user.click(editButton);

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument();
		});
	});

	it('should fetch orders count', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
			update: jest.fn(),
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: [{ id: '1' }, { id: '2' }] }),
		});

		renderAccount();

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith('/api/orders');
		});
	});
});
