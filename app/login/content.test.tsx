import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn, useSession } from 'next-auth/react';

import { StyledComponentsRegistry } from '@/lib/registry';

import { LoginContent } from './content';

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
	useServerInsertedHTML: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
	signIn: jest.fn(),
	useSession: jest.fn(),
}));

jest.mock('@/lib/pageAnimations', () => ({
	fadeVariant: () => ({}),
}));

const renderLogin = () =>
	render(
		<StyledComponentsRegistry isJest>
			<LoginContent />
		</StyledComponentsRegistry>,
	);

describe('LoginContent', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });
	});

	it('should render login form with email and password fields', () => {
		renderLogin();

		expect(screen.getByPlaceholderText('example@mail.com')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
	});

	it('should render submit button', () => {
		renderLogin();

		expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
	});

	it('should render link to register page', () => {
		renderLogin();

		const link = screen.getByRole('link', { name: /зарегистрироваться/i });
		expect(link).toHaveAttribute('href', '/register');
	});

	it('should have disabled submit button when form is invalid', () => {
		renderLogin();

		expect(screen.getByRole('button', { name: /войти/i })).toBeDisabled();
	});

	it('should enable submit button when form is valid', async () => {
		const user = userEvent.setup();
		renderLogin();

		await user.type(screen.getByPlaceholderText('example@mail.com'), 'test@test.com');
		await user.type(screen.getByPlaceholderText('••••••••'), '123456');

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /войти/i })).toBeEnabled();
		});
	});

	it('should call signIn and redirect on success', async () => {
		(signIn as jest.Mock).mockResolvedValue({ error: null });
		const user = userEvent.setup();
		renderLogin();

		await user.type(screen.getByPlaceholderText('example@mail.com'), 'test@test.com');
		await user.type(screen.getByPlaceholderText('••••••••'), '123456');

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /войти/i })).toBeEnabled();
		});

		await user.click(screen.getByRole('button', { name: /войти/i }));

		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith('credentials', {
				redirect: false,
				email: 'test@test.com',
				password: '123456',
			});
			expect(mockPush).toHaveBeenCalledWith('/account');
		});
	});

	it('should display error message on signIn failure', async () => {
		(signIn as jest.Mock).mockResolvedValue({ error: 'Неверный пароль' });
		const user = userEvent.setup();
		renderLogin();

		await user.type(screen.getByPlaceholderText('example@mail.com'), 'test@test.com');
		await user.type(screen.getByPlaceholderText('••••••••'), '123456');

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /войти/i })).toBeEnabled();
		});

		await user.click(screen.getByRole('button', { name: /войти/i }));

		await waitFor(() => {
			expect(screen.getByText('Неверный пароль')).toBeInTheDocument();
		});
	});

	it('should show loading state during submission', async () => {
		(signIn as jest.Mock).mockImplementation(
			() => new Promise((resolve) => setTimeout(() => resolve({ error: null }), 100)),
		);
		const user = userEvent.setup();
		renderLogin();

		await user.type(screen.getByPlaceholderText('example@mail.com'), 'test@test.com');
		await user.type(screen.getByPlaceholderText('••••••••'), '123456');

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /войти/i })).toBeEnabled();
		});

		await user.click(screen.getByRole('button', { name: /войти/i }));

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /вход\.\.\./i })).toBeInTheDocument();
		});
	});
});
