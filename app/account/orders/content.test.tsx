import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { StyledComponentsRegistry } from '@/lib/registry';

import { OrdersContent } from './content';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: mockPush }),
	useServerInsertedHTML: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
	useSession: jest.fn(),
}));

jest.mock('@/services', () => ({
	useCurrency: () => ({
		formatPriceWithSymbol: (price: number) => `$${price}`,
	}),
}));

global.fetch = jest.fn();

const mockUser = { id: 'u1', email: 'test@test.com', name: 'Мария' };

const mockOrders = [
	{
		id: 'order-1',
		orderNumber: 42,
		name: 'Мария',
		surname: 'Иванова',
		phone: '+7 (999) 123-45-67',
		email: 'test@test.com',
		deliveryAddress: 'ул. Главная, 1',
		toApartment: true,
		status: 'pending',
		totalPrice: 500,
		createdAt: '2025-01-15T10:00:00Z',
		items: [
			{ id: 1, title: 'Фикус', price: 500, count: 1 },
		],
	},
	{
		id: 'order-2',
		orderNumber: 43,
		name: 'Мария',
		surname: 'Иванова',
		phone: '+7 (999) 123-45-67',
		email: 'test@test.com',
		deliveryAddress: 'ул. Главная, 1',
		toApartment: false,
		status: 'completed',
		totalPrice: 1200,
		createdAt: '2025-01-20T14:00:00Z',
		items: [
			{ id: 2, title: 'Кактус', price: 600, count: 2 },
		],
	},
];

const renderOrders = () =>
	render(
		<StyledComponentsRegistry isJest>
			<OrdersContent />
		</StyledComponentsRegistry>,
	);

describe('OrdersContent', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should redirect to /login when unauthenticated', () => {
		(useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });
		renderOrders();

		expect(mockPush).toHaveBeenCalledWith('/login');
	});

	it('should show loader while loading', () => {
		(useSession as jest.Mock).mockReturnValue({ status: 'loading', data: null });
		const { container } = renderOrders();

		const spans = container.querySelectorAll('span');
		expect(spans.length).toBeGreaterThanOrEqual(4);
	});

	it('should display empty state when no orders', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: [] }),
		});

		renderOrders();

		await waitFor(() => {
			expect(screen.getByText('У вас пока нет заказов')).toBeInTheDocument();
		});

		const shopLink = screen.getByRole('link', { name: /перейти к покупкам/i });
		expect(shopLink).toHaveAttribute('href', '/products');
	});

	it('should display orders list', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: mockOrders }),
		});

		renderOrders();

		await waitFor(() => {
			expect(screen.getByText('Заказ #42')).toBeInTheDocument();
			expect(screen.getByText('Заказ #43')).toBeInTheDocument();
		});
	});

	it('should display order statuses correctly', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: mockOrders }),
		});

		renderOrders();

		await waitFor(() => {
			expect(screen.getByText('Ожидает обработки')).toBeInTheDocument();
			expect(screen.getByText('Выполнен')).toBeInTheDocument();
		});
	});

	it('should display order items and prices', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: mockOrders }),
		});

		renderOrders();

		await waitFor(() => {
			expect(screen.getByText('Фикус')).toBeInTheDocument();
			expect(screen.getByText('Кактус')).toBeInTheDocument();
		});
	});

	it('should display delivery info with apartment flag', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: [mockOrders[0]] }),
		});

		renderOrders();

		await waitFor(() => {
			expect(screen.getByText(/до квартиры/)).toBeInTheDocument();
		});
	});

	it('should display error message on fetch failure', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			json: () => Promise.resolve({ error: 'Ошибка загрузки' }),
		});

		renderOrders();

		await waitFor(() => {
			expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument();
		});
	});

	it('should have back to profile link', async () => {
		(useSession as jest.Mock).mockReturnValue({
			status: 'authenticated',
			data: { user: mockUser },
		});
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ orders: [] }),
		});

		renderOrders();

		await waitFor(() => {
			const backLink = screen.getByRole('link', { name: /назад в профиль/i });
			expect(backLink).toHaveAttribute('href', '/account');
		});
	});
});
