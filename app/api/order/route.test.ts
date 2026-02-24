import { POST } from './route';

jest.mock('next/server', () => ({
	NextResponse: {
		json: (body: unknown, init?: ResponseInit) =>
			new Response(JSON.stringify(body), {
				...init,
				headers: { 'Content-Type': 'application/json' },
			}),
	},
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
	__esModule: true,
	default: jest.fn(),
	getServerSession: (...args: unknown[]) => mockGetServerSession(...args),
}));

jest.mock('@/app/api/auth/[...nextauth]/route', () => ({ authOptions: {} }));

const mockTransactionGet = jest.fn();
const mockTransactionSet = jest.fn();

jest.mock('@/lib/firebase-admin', () => ({
	adminDb: {
		collection: jest.fn((name: string) => {
			if (name === '_counters') {
				return { doc: jest.fn(() => ({ id: 'orders-counter' })) };
			}
			if (name === 'users') {
				return {
					where: jest.fn(() => ({
						limit: jest.fn(() => ({
							get: jest.fn().mockResolvedValue({ empty: true }),
						})),
					})),
				};
			}
			return { doc: jest.fn(() => ({ id: 'new-order-id' })) };
		}),
		runTransaction: jest.fn(async (fn: (transaction: unknown) => Promise<void>) => {
			await fn({
				get: mockTransactionGet,
				set: mockTransactionSet,
			});
		}),
	},
}));

const validOrderData = {
	name: 'Мария',
	surname: 'Иванова',
	phone: '+7 (999) 123-45-67',
	email: 'maria@test.com',
	deliveryAddress: 'ул. Главная, 1',
	toApartment: false,
	products: {
		items: [{ id: 1, title: 'Plant', price: 100, count: 1 }],
		totalPrice: 100,
	},
};

const createRequest = (body: unknown) =>
	new Request('http://localhost/api/order', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

describe('POST /api/order', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockGetServerSession.mockResolvedValue({
			user: { id: 'user-1', email: 'maria@test.com' },
		});
		mockTransactionGet.mockResolvedValue({
			exists: true,
			data: () => ({ lastOrderNumber: 5 }),
		});
	});

	it('should create order for authenticated user', async () => {
		const res = await POST(createRequest(validOrderData));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.orderId).toBe('new-order-id');
	});

	it('should return 400 for invalid data (missing required fields)', async () => {
		const res = await POST(createRequest({ name: '' }));

		expect(res.status).toBe(400);
	});

	it('should assign incremented order number via transaction', async () => {
		await POST(createRequest(validOrderData));

		expect(mockTransactionSet).toHaveBeenCalledTimes(2);

		const orderSetCall = mockTransactionSet.mock.calls[0];
		expect(orderSetCall[1]).toMatchObject({ orderNumber: 6 });

		const counterSetCall = mockTransactionSet.mock.calls[1];
		expect(counterSetCall[1]).toEqual({ lastOrderNumber: 6 });
	});

	it('should start from order number 1 when counter does not exist', async () => {
		mockTransactionGet.mockResolvedValueOnce({ exists: false });

		await POST(createRequest(validOrderData));

		const orderSetCall = mockTransactionSet.mock.calls[0];
		expect(orderSetCall[1]).toMatchObject({ orderNumber: 1 });
	});
});
