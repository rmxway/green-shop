import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn, useSession } from 'next-auth/react';

import { StyledComponentsRegistry } from '@/lib/registry';

import { RegisterContent } from './content';

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

jest.mock('react-imask', () => ({
	IMaskInput: ({ inputRef, onAccept, ...props }: Record<string, unknown>) => (
		<input
			{...props}
			ref={inputRef as React.Ref<HTMLInputElement>}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				if (typeof onAccept === 'function') {
					onAccept(e.target.value);
				}
			}}
		/>
	),
}));

global.fetch = jest.fn();

const renderRegister = () =>
	render(
		<StyledComponentsRegistry isJest>
			<RegisterContent />
		</StyledComponentsRegistry>,
	);

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
	await user.type(screen.getByPlaceholderText('example@mail.com'), 'new@test.com');
	await user.type(screen.getByPlaceholderText('••••••••'), '123456');
	await user.type(screen.getByPlaceholderText('Мария'), 'Мария');
	await user.type(screen.getByPlaceholderText('Иванова'), 'Иванова');
	await user.type(screen.getByPlaceholderText('+7 (999) 999-99-99'), '+7 (999) 123-45-67');
	await user.type(screen.getByPlaceholderText('Главная улица, 32'), 'ул. Тестовая, 1');
};

describe('RegisterContent', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });
	});

	it('should render all form fields', () => {
		renderRegister();

		expect(screen.getByPlaceholderText('example@mail.com')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Мария')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Иванова')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('+7 (999) 999-99-99')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Главная улица, 32')).toBeInTheDocument();
	});

	it('should render submit button and link to login', () => {
		renderRegister();

		expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
		const link = screen.getByRole('link', { name: /войти/i });
		expect(link).toHaveAttribute('href', '/login');
	});

	it('should have disabled submit button initially', () => {
		renderRegister();

		expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeDisabled();
	});

	it('should enable submit button when form is valid', async () => {
		const user = userEvent.setup();
		renderRegister();

		await fillForm(user);

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeEnabled();
		});
	});

	it('should register and redirect on success', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true }),
		});
		(signIn as jest.Mock).mockResolvedValue({ error: null });

		const user = userEvent.setup();
		renderRegister();
		await fillForm(user);

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeEnabled();
		});

		await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				'/api/register',
				expect.objectContaining({ method: 'POST' }),
			);
			expect(signIn).toHaveBeenCalled();
			expect(mockPush).toHaveBeenCalledWith('/account');
		});
	});

	it('should display error from API', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			json: () => Promise.resolve({ error: 'Email уже существует' }),
		});

		const user = userEvent.setup();
		renderRegister();
		await fillForm(user);

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeEnabled();
		});

		await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

		await waitFor(() => {
			expect(screen.getByText('Email уже существует')).toBeInTheDocument();
		});
	});

	it('should show message when registration ok but signIn fails', async () => {
		jest.useFakeTimers();
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true }),
		});
		(signIn as jest.Mock).mockResolvedValue({ error: 'Sign-in error' });

		const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
		renderRegister();
		await fillForm(user);

		await waitFor(() => {
			expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeEnabled();
		});

		await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

		await waitFor(() => {
			expect(
				screen.getByText(/регистрация прошла успешно, но вход не выполнен/i),
			).toBeInTheDocument();
		});

		jest.useRealTimers();
	});
});
