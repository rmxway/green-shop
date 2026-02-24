import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { StyledComponentsRegistry } from '@/lib/registry';

import { AccountNavItem } from './index';

jest.mock('next-auth/react', () => ({
	useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	usePathname: () => '/',
	useRouter: () => ({ push: jest.fn() }),
	useServerInsertedHTML: jest.fn(),
}));

const onClose = jest.fn();

const renderNavItem = () =>
	render(
		<StyledComponentsRegistry isJest>
			<AccountNavItem onClose={onClose} />
		</StyledComponentsRegistry>,
	);

describe('AccountNavItem', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should show loading state', () => {
		(useSession as jest.Mock).mockReturnValue({ status: 'loading', data: null });
		renderNavItem();

		const el = screen.getByText('Войти');
		expect(el.closest('[aria-busy="true"]')).toBeInTheDocument();
	});

	it('should show login link when not authenticated', () => {
		(useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });
		const { container } = renderNavItem();

		const link = container.querySelector('a[href="/login"]');
		expect(link).toBeInTheDocument();
		expect(screen.getByText('Войти')).toBeInTheDocument();
	});

	it('should show user name when authenticated', () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: { name: 'Мария', email: 'test@test.com' } },
		});
		const { container } = renderNavItem();

		const link = container.querySelector('a[href="/account"]');
		expect(link).toBeInTheDocument();
		expect(screen.getByText('Мария')).toBeInTheDocument();
	});

	it('should show email prefix when name is not available', () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: { email: 'maria@test.com' } },
		});
		renderNavItem();

		expect(screen.getByText('maria')).toBeInTheDocument();
	});

	it('should show "Аккаунт" as fallback', () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: {} },
		});
		renderNavItem();

		expect(screen.getByText('Аккаунт')).toBeInTheDocument();
	});
});
